// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package Multithreading;
public class Main {
   public static void main(String[] var0) {

      // System.out.println("main thread is running and ID:" + Thread.currentThread().getId());

      // Thread t = new Thread(()->{
      //    System.out.println("Child Thread ID:" + Thread.currentThread().getId());
      // });
      // t.start();

      NextThread obj=new NextThread();
      obj.start();
      for(int i=0;i<100000;i++){
         System.out.println("Main thread is running");
      }
      
   }
}
