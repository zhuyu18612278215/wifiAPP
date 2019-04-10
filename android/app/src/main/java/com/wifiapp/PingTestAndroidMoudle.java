//  PingTestAndroidMoudle.java

package com.wifiapp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

public class PingTestAndroidMoudle extends ReactContextBaseJavaModule{
  private ReactContext mReactContext;
  public PingTestAndroidMoudle(ReactApplicationContext reactContext) {
    super(reactContext);
    this.mReactContext = reactContext;
  }

  @Override
  public String getName() {
    return "PingTestAndroid";
  }

  @ReactMethod
  public void pingTestAndroid(
    String command,
    Promise promise) {
      try {
        Process p = Runtime.getRuntime().exec(command);
        InputStream input = p.getInputStream();
        BufferedReader in = new BufferedReader(new InputStreamReader(input));
        // StringBuffer stringBuffer = new StringBuffer();
        String content = "";
        while ((content = in.readLine()) != null) {
          // stringBuffer.append(content);
          sendEvent(mReactContext,"onPingResult",content);
        }
        promise.resolve("ok");
      } catch (Exception e) {
          promise.reject(e);
      }
  }

  private void sendEvent(ReactContext reactContext,String eventName, String data){
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName,data);
  }

}
