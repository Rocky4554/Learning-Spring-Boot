package Multithreading;

public class NextThread extends Thread {
    @Override
    public void run(){
        for(int i=0;i<100000;i++){
            System.out.println("Next thread is running ");

        }
    }

}
