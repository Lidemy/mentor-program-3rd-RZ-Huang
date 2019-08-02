const stackList = [];
const queueList = [];

function Stack() {
  this.push = (element) => {
    const listLength = stackList.length;
    stackList.splice(listLength, 0, element);
  };

  this.pop = () => {
    const listLength = stackList.length;
    stackList.splice(listLength - 1, 1);
  };
}

function Queue() {
  this.push = (element) => {
    const queueLength = queueList.length;
    queueList.splice(queueLength, 0, element);
  };

  this.pop = () => queueList.splice(0, 1);
}


// 測試區

function testResult(obj, list) {
  const pushArray = [1, 2, 5, 3, 4];
  pushArray.forEach((element) => {
    obj.push(element);
    console.log(list);
  });

  console.log('---------------------');

  for (let i = 0; i < 3; i += 1) {
    obj.pop();
    console.log(list);
  }
}

const stackObj = new Stack();
testResult(stackObj, stackList);

console.log('\n---------------------\n');

const queueObj = new Queue();
testResult(queueObj, queueList);
