package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        int zahl1 = 10;

        Integer zahl3 = valueOf(zahl1);
        System.out.println(zahl3.equals(10));
    }

    public static Integer valueOf(int number){
        return Integer.valueOf(number);
    }
}
