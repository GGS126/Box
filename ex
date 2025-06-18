class Device {
public:
  void on() { cout << "전원 ON\n"; }
};
class Media {
public:
  void play() { cout << "재생 중\n"; }
};
class Tablet : public Device, public Media {};

int main() {
  Tablet t;
  t.on();
  t.play();
}
// class Parent {
public:
  void greet() { cout << "Hello Parent\n"; }
};
class Child : public Parent {
public:
  void greet() { cout << "Hello Child\n"; }
};

int main() {
  Parent* p = new Child;
  p->greet();
}
