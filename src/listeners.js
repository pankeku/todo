import { removeTask } from "./Manager";

export default function loadListeners() {
  let tasksEl = document.querySelector('.tasks');

  tasksEl.addEventListener('click', (event) => {
    console.log('wut');
    if (event.target.className === 'remove') {
      let array = event.target.parentElement.id.split('-');
      console.log(array);
      removeTask(Number(array[0]), Number(array[1]));
    }
  });
}
