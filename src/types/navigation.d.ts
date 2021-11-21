import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type BottomParamList = {
  Home: undefined;
  Home2: undefined;
  Transactions: undefined;
  Analytics: undefined;
  Assets: undefined;
  Settings: undefined;
};

export type AppParamList = {
  Home: undefined;
  Tabs: NavigatorScreenParams<BottomParamList>;
};

export type RootScreenProps<Name extends keyof AppParamList> =
  NativeStackScreenProps<AppParamList, Name>;

export type BottomScreenProps<Name extends keyof BottomParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<BottomParamList, Name>,
    NativeStackScreenProps<AppParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppParamList {}
  }
}
