public class Main {
    public static void main(String[] args) {

        for (int i = 1; i <= 10; i++) {
            int threadNumber = i;

            Thread t = new Thread(() -> {
                for (int num = 1; num <= 5; num++) {
                    System.out.println("Thread " + threadNumber + " → " + num);
                }
            });

            t.start();
        }
    }
}
