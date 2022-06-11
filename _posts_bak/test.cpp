#include<cstdio>
#include<cstdlib>
#include<cmath>
#include <iostream>
#include <vector>
using namespace std;

// 全局变量声明
int g;

int main()
{
    // int sum =0;value=0;
    // //循环读取数据
    // while(std::cin>>value){
    //     sm+=value;
    // }
    // 列表
    vector<int > vec={1,2,3};
    cout << "请输入一个整数：" << endl;
    int a;
    cin >> a;
    // cin >> firstNumber >> secondNumber; // 输入两个数
    cout << "你输入的是：" << a << "，该数字类型占用字节：" << sizeof(int) << " 字节" << "，开始追到到数组" << endl;
    vec.push_back(5);
    cout << "最后一个:"<<endl;
    cout << *vec.rbegin();
    // 逐个遍历
    cout << "for循环逐个遍历：" << endl;
   for(int i = 0; i < vec.size(); i++){
       g += vec[i];
      cout << " value of vec [" << i << "] = " << vec[i] << endl;
   }
    // 使用迭代器 iterator 访问值
    cout << "迭代器遍历：" << endl;
    vector<int>::iterator v = vec.begin();
   while( v != vec.end()) {
      cout << "[while] value of v = " << *v << endl;
      v++;
   }
    int sum = vec[1];
    cout<<"Sum is:"<<sum<<endl;
    std::cout << "compile hello world.exe by linux and i686-w64-mingw32-g++\n";
    //system("PAUSE") ;
    cout << "日期：" << __DATE__ << ", 时间：" << __TIME__ << "，文件：" << __FILE__ << "，行号：" << __LINE__ << endl;
    return 0;
}
