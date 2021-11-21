import { StorageAdapter } from '@urql/exchange-graphcache';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { mmkv } from '@app/storage';

export type StorageOptions = {
  dataKey?: string;
  metadataKey?: string;
  maxAge?: number;
};

const parseData = (persistedData: any, fallback: any) => {
  try {
    if (persistedData) {
      return JSON.parse(persistedData);
    }
  } catch (_err) {}

  return fallback;
};

let disconnect: NetInfoSubscription | undefined;

export interface DefaultAsyncStorage extends StorageAdapter {
  clear(): Promise<any>;
}

export const makeAsyncStorage: (ops?: StorageOptions) => DefaultAsyncStorage =
  ({
    dataKey = 'graphcache-data',
    metadataKey = 'graphcache-metadata',
    maxAge = 7,
  } = {}) => {
    const todayDayStamp = Math.floor(
      new Date().valueOf() / (1000 * 60 * 60 * 24),
    );
    const allData = {} as Record<string, unknown>;

    return {
      readData: () => {
        if (!Object.keys(allData).length) {
          let persistedData = mmkv.getString(dataKey) ?? null;
          const parsed = parseData(persistedData, {});

          Object.assign(allData, parsed);
        }

        // clean up old data
        let syncNeeded = false;
        Object.keys(allData).forEach(dayStamp => {
          if (todayDayStamp - Number(dayStamp) > maxAge) {
            syncNeeded = true;
            delete allData[dayStamp];
          }
        });

        if (syncNeeded) {
          mmkv.set(dataKey, JSON.stringify(allData));
        }

        return Promise.resolve(
          Object.assign({}, ...Object.keys(allData).map(key => allData[key])),
        );
      },

      writeData: async delta => {
        if (!Object.keys(allData).length) {
          let persistedData = mmkv.getString(dataKey) ?? null;

          const parsed = parseData(persistedData, {});
          Object.assign(allData, parsed);
        }

        const deletedKeys = {} as Record<string, unknown>;
        Object.keys(delta).forEach(key => {
          if (delta[key] === undefined) {
            deletedKeys[key] = undefined;
          }
        });

        for (const key in allData) {
          allData[key] = Object.assign(allData[key], deletedKeys);
        }

        allData[todayDayStamp] = Object.assign(
          allData[todayDayStamp] || {},
          delta,
        );

        mmkv.set(dataKey, JSON.stringify(allData));
      },

      writeMetadata: data => {
        mmkv.set(metadataKey, JSON.stringify(data));
      },

      readMetadata: () => {
        let persistedData = mmkv.getString(dataKey) ?? null;
        return Promise.resolve(parseData(persistedData, {}));
      },

      onOnline: cb => {
        if (disconnect) {
          disconnect();
          disconnect = undefined;
        }

        disconnect = NetInfo.addEventListener(({ isConnected }) => {
          if (isConnected) {
            cb();
          }
        });
      },

      clear: async () => {
        mmkv.delete(dataKey);
        mmkv.delete(metadataKey);
      },
    };
  };
