import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
    let jsCodeLocation = RCTBundleURLProvider.sharedSettings()
      .jsBundleURL(forBundleRoot: "app/index.ios", fallbackResource: nil)

    let rootView = RCTRootView(
      bundleURL: jsCodeLocation,
      moduleName: "App",
      initialProperties: nil,
      launchOptions:launchOptions)
    rootView?.backgroundColor = UIColor(red: 1, green:1, blue:1, alpha:1)

    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    
    return true
  }
}
