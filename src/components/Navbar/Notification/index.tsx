/* eslint-disable react/prop-types */
import { useNotifStore } from '@configs/zustand';
import useNetworks, {
  GenericQueryResponse,
} from '@hooks/useNetworks';
import useSocket from '@hooks/useSocket';
import { Icon } from '@iconify/react';
import { Menu, Tabs } from '@mantine/core';
import {
  BASE_PROXY,
  NOTIFICATION_ENDPOINT,
} from '@services/api/endpoint';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { SocketResponse, UnreadNotifData } from './index.types';
import NotificationSection from './NotificationSection';
import ActionContainer from '../ActionContainer';

function Notification() {
  const { unread, increaseUnread, setUnread } = useNotifStore(
    (st) => st
  );

  const [opened, setOpened] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  const { data, isConnected, initiate, register } = useSocket(
    import.meta.env.VITE_API_NOTIFICATIONS_SERVICE_URL,
    '/channels'
  );

  useEffect(() => {
    initiate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isConnected) {
      register('message');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if ((data as SocketResponse)?.message?.origin === 'KMS') {
      increaseUnread(1, 'kms');
    }
    if ((data as SocketResponse)?.message?.origin === 'LMS') {
      increaseUnread(1, 'lms');
    }
    if ((data as SocketResponse)?.message?.origin === 'TMS') {
      increaseUnread(1, 'tms');
    }
    if ((data as SocketResponse)?.message?.origin === 'TMS') {
      increaseUnread(1, 'cms');
    }
  }, [data, increaseUnread]);

  const view = (v = 0, isAbsolute = true) => {
    if (v > 99) {
      return (
        <div
          className={clsx(
            'left-5 top-1 flex items-center justify-center rounded-full bg-danger-main text-xs',
            isAbsolute ? 'absolute h-3.5 min-w-6' : 'h-5 min-w-8'
          )}
        >
          <h6 className="px-0.5 font-semibold text-base-white">99</h6>
        </div>
      );
    }

    if (v === 0) {
      return null;
    }

    return (
      <div
        className={clsx(
          'left-5 top-1 flex min-w-3.5 items-center justify-center rounded-full bg-danger-main',
          isAbsolute ? 'absolute h-3.5 ' : 'h-5 min-w-6'
        )}
      >
        <h6 className="px-0.5 font-semibold text-base-white">{v}</h6>
      </div>
    );
  };

  const { query } = useNetworks(BASE_PROXY.notifications);

  query<GenericQueryResponse<UnreadNotifData>>(
    NOTIFICATION_ENDPOINT.GET.unreadCount,
    {
      queryKey: ['notificationGetUnreadCount'],
      onSuccess: (res) => {
        setUnread({
          kms: res?.data?.kms || 0,
          tms: res?.data?.tms || 0,
          cms: res?.data?.cms || 0,
          lms: res?.data?.lms || 0,
          all: res?.data?.all || 0,
        });
      },
    }
  );

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      position="bottom-end"
      offset={17.5}
      width={500}
      radius="md"
    >
      <Menu.Target>
        <ActionContainer isActive={opened} className="relative mr-2">
          {view(unread?.all)}
          <Icon icon="ri:notification-2-line" width={21} />
        </ActionContainer>
      </Menu.Target>

      <Menu.Dropdown className="my-0 max-h-[721px] overflow-y-scroll py-0">
        <Menu.Label className="mt-2">
          <h2 className="text-xl font-bold text-base-black">
            Notifikasi
          </h2>
        </Menu.Label>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          classNames={{
            root: '[&>[data-active]]:text-[#016DB2]',
            tabLabel: 'text-sm text-center font-semibold ',
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="all">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== 'all'
                    ? 'text-base-darkGray'
                    : 'text-[#016DB2]'
                }`}
              >
                Pemberitahuan {view(unread?.all, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="kms">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== 'kms'
                    ? 'text-base-darkGray'
                    : 'text-[#016DB2]'
                }`}
              >
                KMS {view(unread?.kms, false)}
              </div>
            </Tabs.Tab>

            <Tabs.Tab value="lms">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== 'lms'
                    ? 'text-base-darkGray'
                    : 'text-[#016DB2]'
                }`}
              >
                {' '}
                LMS {view(unread?.lms, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="tms">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== 'tms'
                    ? 'text-base-darkGray'
                    : 'text-[#016DB2]'
                }`}
              >
                {' '}
                TMS {view(unread?.tms, false)}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="cms">
              <div
                className={`flex items-center gap-2 ${
                  activeTab !== 'cms'
                    ? 'text-base-darkGray'
                    : 'text-[#016DB2]'
                }`}
              >
                {' '}
                CMS {view(unread?.cms, false)}
              </div>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="all">
            <NotificationSection
              origin="all"
              tab={activeTab as string}
            />
          </Tabs.Panel>
          <Tabs.Panel value="kms">
            <NotificationSection
              origin="kms"
              tab={activeTab as string}
            />
          </Tabs.Panel>
          <Tabs.Panel value="lms">
            <NotificationSection
              origin="lms"
              tab={activeTab as string}
            />
          </Tabs.Panel>
          <Tabs.Panel value="tms">
            <NotificationSection
              origin="tms"
              tab={activeTab as string}
            />
          </Tabs.Panel>
          <Tabs.Panel value="cms">
            <NotificationSection
              origin="cms"
              tab={activeTab as string}
            />
          </Tabs.Panel>
        </Tabs>
      </Menu.Dropdown>
    </Menu>
  );
}

export default Notification;
