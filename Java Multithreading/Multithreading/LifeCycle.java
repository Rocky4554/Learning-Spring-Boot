package Multithreading;

public class LifeCycle implements Runnable {
    @Override
    public void run(){

    }
    public static void main(String args[]){

        Thread t = new Thread(new LifeCycle());// start state
        System.out.println(t.getState());

        t.start();// running ot runnable state 
        System.out.println(t.getState());

        



    }
    
}
