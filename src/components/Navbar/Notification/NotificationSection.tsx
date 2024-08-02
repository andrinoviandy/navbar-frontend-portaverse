import ChipCarousel from '@components/ChipCarousel';
import useNetworks, {
  GenericQueryResponse,
} from '@hooks/useNetworks';
import useOnScrollFetch from '@hooks/useOnScrollFetch';
import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  Loader,
  Menu,
  Select,
} from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  BASE_PROXY,
  COURSE_ENDPOINT,
  NOTIFICATION_ENDPOINT,
} from '@services/api/endpoint';
import { useQueryClient } from '@tanstack/react-query';
import notifURLLookup from '@utils/notifURLLookup';
import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import parse from 'html-react-parser';
import { useEffect, useMemo, useRef, useState } from 'react';

import {
  BASTLogData,
  ModulesData,
  NotifData,
  NotifItem,
  TransformedModulesItem,
  TransformedNotifData,
} from './index.types';

dayjs.locale('id');
dayjs.extend(relativeTime);

type Form = UseFormReturnType<
  {
    checkAll: boolean;
    status: null;
    checkbox: object;
  },
  (values: { checkAll: boolean; status: null; checkbox: object }) => {
    checkAll: boolean;
    status: null;
    checkbox: object;
  }
>;
type FormObject = {
  checkAll: boolean;
  status: null;
  checkbox: Record<string, boolean>;
};

interface DetailNotificationProps {
  notification: NotifItem;
  isAction?: boolean;
  isDetailed?: boolean;
  handleClickActionState?: (
    notification: NotifItem,
    isAccept: boolean
  ) => void;
}

function DetailNotification({
  notification,
  isAction,
  isDetailed,
  handleClickActionState,
}: DetailNotificationProps) {
  const { query } = useNetworks(BASE_PROXY.course);

  const { data, isLoading } = query<
    GenericQueryResponse<BASTLogData>,
    BASTLogData
  >(COURSE_ENDPOINT.GET.getBastLog(notification?.data as string), {
    queryKey: ['getHistoryBast'],
    enabled: !isAction && isDetailed,
    select: (res) => res?.data,
  });

  return (
    <div className="px-10 py-4">
      {(() => {
        if (isAction) {
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                color="red"
                size="xs"
                onClick={() =>
                  handleClickActionState?.(notification, false)
                }
              >
                Tolak
              </Button>
              <Button
                size="xs"
                onClick={() => {
                  handleClickActionState?.(notification, true);
                }}
              >
                Terima
              </Button>
            </div>
          );
        }

        if (isLoading)
          return (
            <div className="mt-3 flex h-max w-full justify-center">
              <Loader />
            </div>
          );

        if (data?.length) {
          return (
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-[#016DB2]">
                Cost Center {data?.[0]?.cost_center_name}
              </span>
              {data?.map((v, i) => (
                <div
                  key={v?.log_id}
                  className="flex items-start justify-start gap-4"
                >
                  <div className="p-0 ">
                    <input
                      type="radio"
                      className="border-2 accent-[#016DB2]"
                      checked={i === 0}
                      disabled={i !== 0}
                    />
                  </div>{' '}
                  <div className="flex flex-col">
                    <p
                      className={`text-sm ${
                        i !== 0 ? 'text-base-darkGray' : ''
                      }`}
                    >
                      {v?.action} oleh{' '}
                      <strong
                        className={i === 0 ? 'text-[#016DB2]' : ''}
                      >
                        {v?.user}{' '}
                      </strong>
                      sebagai{' '}
                      <strong
                        className={i === 0 ? 'text-[#016DB2]' : ''}
                      >
                        {v?.as}
                      </strong>{' '}
                      pada{' '}
                      <strong
                        className={i === 0 ? 'text-[#016DB2]' : ''}
                      >
                        {dayjs(v?.on).format(`DD MMM YYYY HH.mm`)}
                      </strong>
                    </p>
                    <div className="flex items-center gap-1 text-xs text-base-darkGray">
                      <div className="mt-1">
                        <Icon
                          icon="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
                          width={12}
                        />
                      </div>
                      <span className="pt-1">
                        {dayjs(notification?.reminder_at)?.format(
                          'DD MMMM YYYY, H:mm'
                        )}
                      </span>
                    </div>{' '}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <i className="text-center text-sm">
            Tidak ada riwayat BAST
          </i>
        );
      })()}
    </div>
  );
}

interface MenuItemProps {
  notification: NotifItem;
  isPage: boolean;
  form: Form;
}
function MenuItem({ notification, isPage, form }: MenuItemProps) {
  const [isHover, setIsHover] = useState(false);
  const [isDetailed, setIsDetailed] = useState(false);

  const queryClient = useQueryClient();

  const { mutation } = useNetworks(BASE_PROXY.notifications);

  const { mutate: deleteMutate } = mutation('delete');
  const { mutate: put } = mutation('put');

  const handleClickActionState = (
    notif: NotifItem,
    isAccept: boolean
  ) => {
    put(
      {
        endpoint: NOTIFICATION_ENDPOINT.PUT.aceptableActionNotif(
          notif?.notification_id
        ),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`notifications${origin}`],
          });
          if (isAccept) {
            window.location.href = `${
              import.meta.env.VITE_LMS_URL
            }/explore/${notif?.data}/checkout`;
          }
        },
      }
    );
  };

  const handleClickNotif = (notif: NotifItem) => {
    if (!notif?.viewed) {
      put(
        {
          endpoint: NOTIFICATION_ENDPOINT.PUT.markAsRead(
            notif?.notification_id
          ),
        },
        {
          onSuccess: () => {
            notifURLLookup(
              notif?.notification_topic_code,
              notif?.send_from,
              notif?.data,
              notif
            );

            queryClient.invalidateQueries({
              queryKey: [`notifications${origin}`],
            });
            queryClient.invalidateQueries({
              queryKey: ['notificationGetUnreadCount'],
            });
          },
        }
      );
    } else {
      notifURLLookup(
        notif?.notification_topic_code,
        notif?.send_from,
        notif?.data,
        notif
      );
    }
  };

  return (
    <div
      className={clsx(
        notification?.is_pinned ? 'border-l-2 border-[#016DB2] ' : ''
      )}
    >
      <div className="border-b">
        <div
          key={notification?.notification_id}
          className={clsx('p-2', isDetailed && 'bg-base-highlight')}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex w-full cursor-pointer flex-row items-start gap-4">
            <Checkbox
              size="xs"
              onChange={(e) => {
                form.setFieldValue(
                  `checkbox.notif_${notification?.notification_id}`,
                  e.target.checked
                );
              }}
              checked={
                (form.values as FormObject).checkbox?.[
                  `notif_${notification?.notification_id}`
                ]
              }
            />
            <div className={`flex w-full flex-col gap-[2px] `}>
              <div className="flex w-full flex-row items-center justify-between">
                <button
                  type="button"
                  className={clsx(
                    'text-sm font-bold text-[#016DB2]',
                    !isPage && 'line-clamp-1'
                  )}
                  onClick={() => handleClickNotif(notification)}
                >
                  {notification?.title}
                </button>
                <div className="flex flex-row gap-1 ">
                  {isHover && !notification?.is_global && (
                    <>
                      <button
                        type="button"
                        className="p-0 font-normal text-base-darkGray hover:text-[#016DB2]"
                        onClick={() => {
                          if (!notification?.viewed) {
                            put(
                              {
                                endpoint:
                                  NOTIFICATION_ENDPOINT.PUT.markAsRead(
                                    notification?.notification_id
                                  ),
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries({
                                    queryKey: [
                                      `notifications${origin}`,
                                    ],
                                  });
                                  queryClient.invalidateQueries({
                                    queryKey: [
                                      'notificationGetUnreadCount',
                                    ],
                                  });
                                },
                              }
                            );
                          }
                        }}
                      >
                        <Icon
                          icon={
                            notification?.viewed
                              ? 'mdi-light:email-open'
                              : 'mdi-light:email'
                          }
                          width={20}
                        />{' '}
                      </button>
                      <button
                        type="button"
                        className="p-0 font-normal text-base-darkGray hover:text-danger-main"
                        onClick={() => {
                          if (!notification?.is_global) {
                            deleteMutate(
                              {
                                endpoint:
                                  NOTIFICATION_ENDPOINT.DELETE.deleteNotification(
                                    notification?.notification_id
                                  ),
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries({
                                    queryKey: [
                                      `notifications${origin}`,
                                    ],
                                  });
                                },
                              }
                            );
                          }
                        }}
                      >
                        <Icon icon="ph:trash" width={20} />{' '}
                      </button>
                      <button
                        type="button"
                        className={`p-0 font-normal hover:text-[#016DB2]  ${
                          notification?.is_pinned
                            ? 'text-[#016DB2]'
                            : 'text-base-darkGray'
                        }`}
                        onClick={() => {
                          put(
                            {
                              endpoint:
                                NOTIFICATION_ENDPOINT.PUT.pinnedNotif(
                                  notification?.notification_id
                                ),
                              data: {
                                pinned: notification?.is_pinned
                                  ? 0
                                  : 1,
                              },
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries({
                                  queryKey: [
                                    `notifications${origin}`,
                                  ],
                                });
                              },
                            }
                          );
                        }}
                      >
                        <Icon
                          icon={
                            notification?.is_pinned
                              ? 'tabler:pin-filled'
                              : 'tabler:pin'
                          }
                          width={20}
                        />{' '}
                      </button>
                    </>
                  )}
                  {notification?.is_have_detail ? (
                    <button
                      type="button"
                      className="p-0 font-normal text-base-darkGray  hover:text-[#016DB2]"
                      onClick={() => {
                        setIsDetailed((prev) => !prev);
                      }}
                    >
                      <Icon
                        icon={
                          isDetailed
                            ? 'charm:chevron-up'
                            : 'charm:chevron-down'
                        }
                        width={20}
                      />{' '}
                    </button>
                  ) : null}
                  {!notification?.viewed && (
                    <span className="text-2xl text-[#016DB2]">
                      &bull;
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleClickNotif(notification)}
                className="text-start"
              >
                <span
                  className={clsx(
                    'w-full text-sm text-base-black',
                    !isPage && 'line-clamp-2'
                  )}
                >
                  {notification?.message &&
                    parse(notification?.message)}
                </span>
                <div className="flex items-center gap-1 text-xs text-base-darkGray">
                  <div className="mt-1">
                    <Icon
                      icon="streamline:interface-time-clock-circle-clock-loading-measure-time-circle"
                      width={12}
                    />
                  </div>
                  <span className="pt-1">
                    {dayjs(notification?.reminder_at)?.format(
                      'DD MMMM YYYY, H:mm'
                    )}
                  </span>
                </div>{' '}
              </button>
            </div>
          </div>
        </div>
        {isDetailed && (
          <DetailNotification
            isDetailed={isDetailed}
            notification={notification}
          />
        )}
        {notification?.is_have_action && (
          <DetailNotification
            isAction
            notification={notification}
            handleClickActionState={handleClickActionState}
          />
        )}
      </div>
    </div>
  );
}

const listStatus = [
  { label: 'Semua', value: 'all' },
  { label: 'Telah Dibaca', value: 'read' },
  {
    label: 'Belum Dibaca',
    value: 'unread',
  },
];

const upperCaseModule = ['Bast', 'Kmap', 'Kpi'];

interface NotificationSectionProps {
  origin: string;
  tab: string;
  isPage?: boolean;
}

function NotificationSection({
  origin,
  tab,
  isPage = false,
}: NotificationSectionProps) {
  const queryClient = useQueryClient();
  const [module, setModule] = useState<string | number | null>(null);
  const ref = useRef(null);

  const { query, infiniteQuery, mutation } = useNetworks(
    BASE_PROXY.notifications
  );

  const form = useForm({
    initialValues: {
      checkAll: false,
      status: null,
      checkbox: {},
    },
  });

  const { data: dataModules } = query<
    GenericQueryResponse<ModulesData>,
    TransformedModulesItem
  >(
    NOTIFICATION_ENDPOINT.GET.notificationModules,
    {
      queryKey: [`notificationModules${origin}`],
      select: (data): TransformedModulesItem =>
        data?.data?.modules?.map((item) => ({
          value: item,
          label: upperCaseModule.includes(item)
            ? item.toUpperCase()
            : item,
        })),
      enabled: origin === tab,
    },
    {
      params: {
        origin,
      },
    }
  );

  const {
    data: notifications,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = infiniteQuery<
    GenericQueryResponse<NotifData>,
    TransformedNotifData
  >(
    NOTIFICATION_ENDPOINT.GET.notifications,
    {
      queryKey: [
        `notifications${origin}`,
        module,
        origin,
        form.values.status,
      ],
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.data.totalPage;
        const nextPage = allPages.length + 1;
        return nextPage <= Math.ceil(maxPages) ? nextPage : undefined;
      },
      select: (res) => ({
        totalPage: res?.pages?.[0]?.data?.totalPage,
        items: res?.pages
          ?.map((page) =>
            page.data?.notifications.map((item) => item)
          )
          .flat(),
      }),
      enabled: origin === tab,
      initialPageParam: 1,
    },
    {
      params: {
        size: 10,
        origin: origin !== 'all' ? origin : null,
        module,
        read: (() => {
          if (form?.values?.status === 'read') return 1;
          if (form?.values?.status === 'unread') return 0;
          return null;
        })(),
      },
    }
  );

  const { mutate: put } = mutation('put');

  useOnScrollFetch(hasNextPage, fetchNextPage, ref);

  const initialState = useMemo(() => {
    const field: FormObject = {
      ...form.values,
    };
    const validate = {};
    notifications?.items?.forEach((v) => {
      const key = `notif_${v.notification_id}`;
      if (!field.checkbox?.[key]) {
        field.checkbox[key] = false;
      }
    });

    return {
      initialValues: field,
      validate,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications?.items]);

  useEffect(() => {
    form.setValues(initialState.initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState]);

  const handleChangeRead = (view: number) => {
    const filteredCheck = Object.keys(form.values.checkbox)?.filter(
      (key) => {
        return (form.values as FormObject).checkbox[key] === true;
      }
    );
    const ids: string[] = [];
    filteredCheck?.forEach((v) => {
      ids.push(v?.replace('notif_', ''));
    });
    put(
      {
        endpoint: NOTIFICATION_ENDPOINT.PUT.putReads,
        data: {
          view,
          notification_ids: form?.values?.checkAll ? [] : ids,
          origin: origin === 'all' ? null : origin,
          module,
          read: (() => {
            if (form?.values?.status === 'read') return 1;
            if (form?.values?.status === 'unread') return 0;
            return null;
          })(),
        },
      },
      {
        onSuccess: () => {
          form.setFieldValue('checkbox', {});
          form.setFieldValue('checkAll', false);
          queryClient.invalidateQueries({
            queryKey: [`notifications${origin}`],
          });
          queryClient.invalidateQueries({
            queryKey: ['notificationGetUnreadCount'],
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="w-full border-b-DEFAULT">
        <ChipCarousel
          data={dataModules || []}
          value={module}
          onClick={(v) => {
            setModule(v);
          }}
        />
      </div>

      <div className="flex flex-row justify-between border-b p-2">
        <div className="flex flex-row items-center  gap-2">
          {(notifications?.items?.length || 0) > 0 && (
            <>
              <div className="mt-2">
                <Checkbox
                  classNames={{ label: 'text-xs' }}
                  size="xs"
                  label="Pilih Semua"
                  onChange={(e) => {
                    form.setFieldValue('checkAll', e.target.checked);
                    const data: Record<string, boolean> = {};
                    notifications?.items?.forEach((v) => {
                      if (
                        Object.keys(form.values.checkbox)?.filter(
                          (key) => {
                            return (
                              (form.values as FormObject).checkbox[
                                key
                              ] === true
                            );
                          }
                        )?.length === notifications?.items?.length
                      ) {
                        data[`notif_${v?.notification_id}`] = false;
                      } else {
                        data[`notif_${v?.notification_id}`] = true;
                      }
                    });
                    form.setFieldValue('checkbox', data);
                  }}
                  checked={
                    Object.keys(form.values.checkbox)?.filter(
                      (key) => {
                        return (
                          (form.values as FormObject).checkbox[
                            key
                          ] === true
                        );
                      }
                    )?.length === notifications?.items?.length
                  }
                />
              </div>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <div className="mt-2">
                    <Icon icon="charm:chevron-down" width={20} />
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item onClick={() => handleChangeRead(1)}>
                    Tandai semua dibaca
                  </Menu.Item>
                  <Menu.Item onClick={() => handleChangeRead(0)}>
                    Tandai semua belum dibaca
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}{' '}
        </div>

        <div className="w-36">
          <Select
            data={listStatus}
            size="xs"
            placeholder="Status Notifikasi"
            {...form.getInputProps('status')}
            clearable
            // {...getClearableProps(
            //   form.values.status,
            //   () => form.setFieldValue('status', null),
            //   'select'
            // )}
          />
        </div>
      </div>
      <div
        className={clsx(
          'flex w-full flex-col overflow-auto',
          isPage ? 'h-full' : 'h-[250px]'
        )}
        ref={ref}
      >
        {(() => {
          if (isLoading) {
            return <Loader size="sm" className="mx-auto my-3.5" />;
          }

          if (!notifications?.items) return null;

          return notifications?.items?.map((v) => {
            return (
              <MenuItem
                key={`notif-menu-item-${v?.notification_id}`}
                notification={v}
                form={form}
                isPage={isPage}
              />
            );
          });
        })()}

        {isFetchingNextPage && (
          <Loader size="sm" className="mx-auto my-3.5" />
        )}
      </div>
      {!isPage && (
        <div className="flex flex-row justify-center py-2">
          <Button
            variant="white"
            className="disabled:bg-base-white"
            onClick={() => {
              window.location.href = `${
                import.meta.env.VITE_SSO_URL
              }/notifications`;
            }}
            type="button"
          >
            Lihat semua
          </Button>
        </div>
      )}
    </div>
  );
}

export default NotificationSection;
