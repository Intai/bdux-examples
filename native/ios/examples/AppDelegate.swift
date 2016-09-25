import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    //let url = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "main.ios", fallbackResource: nil)
    let url = URL(string: "http://localhost:8081/app/main.ios.bundle?platform=ios&dev=true")
    let rootView = RCTRootView(
      bundleURL: url,
      moduleName: "App",
      initialProperties: nil,
      launchOptions:launchOptions)

    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    
    return true
  }
}
