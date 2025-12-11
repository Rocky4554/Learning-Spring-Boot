package Multithreading;

public class RunnableMethod implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread is running");
    }

    public static void main(String[] args) {
        Thread t = new Thread(new RunnableMethod());// creatig instance of thread and passing class as a constructor
        t.start();
}

// public class Main {
// public static void main(String[] args) {
// Thread t = new Thread(new RunnableMethod());
// t.start();
// }

// ✔ When to use?

// Recommended way in most applications.

// If your class already extends another class.

// More flexible and used in Executors / Thread pools.

// ✔ Advantages

// Allows multiple inheritance (interface + another class).

// Clean separation of:

// Thread logic → inside Runnable

// Thread control → inside Thread object
