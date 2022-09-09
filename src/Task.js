export default function taskFactory(title, description, dueDate, priority) {
    return {
        title: title || 'Title',
        description: description || '',
        dueDate: dueDate || '',
        priority: priority || '',

        set title(newTitle) {
            title = newTitle;
        },

        get title() {
            return title;
        }
    }
}
