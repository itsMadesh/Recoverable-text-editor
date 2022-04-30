class Node:
    def __init__(self,parent,data):
        self.parent=parent
        self.data=data
        self.childs=[]
        self.bool=0
class Tree:
    def __init__(self):
        self.root=Node(None,"*")
        self.curpos=self.root
    def insert(self,data):
        i=0
        while(len(data)!=i):
            l=len(self.curpos.childs)
            if l!=0:
                newnode=Node(self.curpos,data[i])
                newnode.childs=self.curpos.childs
                self.curpos.childs.clear()
                self.curpos.childs.append(newnode)
                j=0
                while(len(newnode.childs)!=j):
                    newnode.childs[j].parent=newnode
                    j+=1
                
                print(self.curpos.parent," ",self.curpos," ",self.curpos.childs,"\n")
                self.curpos=newnode
                print(self.curpos.parent," ",self.curpos," ",self.curpos.childs,"\n")
            else:
                self.curpos.childs.append(Node(self.curpos,data[i]))
                self.curpos=self.curpos.childs[len(self.curpos.childs)-1]
            i+=1

    def move_left(self):
        if(self.curpos.parent!=None):
            self.curpos=self.curpos.parent
        else:
            print("can't move towards left")
    def move_right(self):
        l=len(self.curpos.childs)
        if(l==0):
            print("can't move towards right")
        i=0
        while(i<l):
            self.curpos=self.curpos.childs[i]
            if self.curpos.bool!=1:
                break
            i+=1
    def display(self):
        temp=self.root
        while(temp):
            i=0
            if(temp!=self.root):
                print(temp.data,end="")
            if(self.curpos==temp):
                print("|",end="")
            l=len(temp.childs)
            while(i<l and temp.childs[i] and temp.childs[i].bool!=0):
                i+=1
            if i==l:
                temp=None
            else:
                temp=temp.childs[i]
        print("\n")

t=Tree()
while(1):
    c=input("Enter your choice:")
    if c=="i":
        data=input()
        t.insert(data)
    elif c=="b":
        #backspace operation
        d=1
    elif c=="l":
        t.move_left()
    elif c=="r":
        t.move_right()
    elif c=="p":
        t.display()
    elif c=="e":
        print("Exited")
        break
    else:
        print("invalid Input") 
    # t.display()
  
