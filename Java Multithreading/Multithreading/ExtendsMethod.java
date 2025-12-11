package Multithreading;

import java.util.concurrent.ThreadPoolExecutor;

public class ExtendsMethod extends Thread {
        @Override
    public void run() {
        System.out.println("Thread is running");
    }
       public static void main(String[] args) {
        ExtendsMethod t = new ExtendsMethod();
        t.start();  // starts a new thread
    }
}

// public class Main {
//     public static void main(String[] args) {
//         ExtendsMethod t = new ExtendsMethod();
//         t.start();  // starts a new thread
//     }
    
// }


// When to use?

// When you want to customize the thread itself.

// When your class won’t extend any other class (because Java does not support multiple inheritance).

// ❌ Drawback

// You cannot extend any other class (since you're already extending Thread).