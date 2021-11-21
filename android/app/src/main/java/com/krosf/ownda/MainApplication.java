package com.krosf.ownda;

import android.app.Application;
import android.content.Context;
// Expo Modules
import android.content.res.Configuration;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
// REANIMATED
import com.facebook.react.bridge.JSIModulePackage;
// MMKV
import com.facebook.react.bridge.JSIModuleSpec;
import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.soloader.SoLoader;
import com.reactnativemmkv.MmkvModule;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
import expo.modules.ApplicationLifecycleDispatcher;
import expo.modules.ReactNativeHostWrapper;
import java.lang.reflect.InvocationTargetException;
import java.util.Collections;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHostWrapper(
    this,
    new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }

      @Override
      protected JSIModulePackage getJSIModulePackage() {
        return new RNStarterJSIPackage();
      }
    }
  );

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
    Context context,
    ReactInstanceManager reactInstanceManager
  ) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName(
          "com.krosf.ownda.ReactNativeFlipper"
        );
        aClass
          .getMethod(
            "initializeFlipper",
            Context.class,
            ReactInstanceManager.class
          )
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  }
}

// TODO: Remove all of this when MMKV and Reanimated can be autoinstalled (maybe RN 0.65)
// RNStarterJSIPackage is not in a separate file bc it was causing problem when renaming project
class RNStarterJSIPackage extends ReanimatedJSIModulePackage {

  @Override
  public List<JSIModuleSpec> getJSIModules(
    ReactApplicationContext reactApplicationContext,
    JavaScriptContextHolder jsContext
  ) {
    super.getJSIModules(reactApplicationContext, jsContext);
    MmkvModule.install(
      jsContext,
      reactApplicationContext.getFilesDir().getAbsolutePath() + "/mmkv"
    );
    return Collections.emptyList();
  }
}
