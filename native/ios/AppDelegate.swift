import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

  var window: UIWindow?

  func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject : AnyObject]?) -> Bool {

    //let url = NSBundle.mainBundle().URLForResource("main", withExtension: "jsbundle")
    let url = NSURL(string: "http://localhost:8081/index.ios.bundle?platform=ios&dev=true")
    let rootView = RCTRootView(
      bundleURL: url,
      moduleName: "native",
      initialProperties: nil,
      launchOptions:launchOptions)

    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    self.window = UIWindow(frame: UIScreen.mainScreen().bounds)
    self.window?.rootViewController = rootViewController
    self.window?.makeKeyAndVisible()
    
    return true
  }
}