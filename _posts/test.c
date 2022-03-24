#include <stdio.h>
 
int main()
{
    //printf("Hello, World");
    int size=3;
    int A[3]={4,2,1};
    int B[3]={2,4,1};
    int i=0;
    for(i=0;i<size;i++)
    {
        printf("%s\t", A[i]);
        //printf("%s -> %s", i, A[i]);
    }
    return(0);
}