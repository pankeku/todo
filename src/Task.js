export default function taskFactory(title, description, dueDate, priority) {
  return {
    _title: title || 'Title',

    _description: description || '',

    _dueDate: dueDate || '',

    _priority: priority || '',

    get title() {
      return this._title;
    },
    set title(value) {
      this._title = value;
    },

    get description() {
      return this._description;
    },
    set description(value) {
      this._description = value;
    },

    get dueDate() {
      return this._dueDate;
    },
    set dueDate(value) {
      this._dueDate = value;
    },

    get priority() {
      return this._priority;
    },
    set priority(value) {
      this._priority = value;
    },
  };
}
