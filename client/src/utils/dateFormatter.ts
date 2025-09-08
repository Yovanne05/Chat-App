export const formatMessageTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
};