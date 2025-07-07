const STATUS_COLORS = {
    completed: '#4caf50',      // Green
    'in-progress': '#2196f3',  // Blue
    pending: '#ff9800',        // Orange
    cancelled: '#f44336',      // Red
    'on-hold': '#9c27b0',      // Purple
    'in-review': '#00bcd4'     // Cyan
};

// Helper to normalize statuses (e.g., "in progress" => "in-progress")
const normalizeStatus = (status) => {
    return status
        .toLowerCase()
        .trim()
        .replace(/[\s_-]+/g, '-'); // Replace spaces, underscores, and dashes with a single dash
};

// Function to get unique statuses
export const getUniqueStatuses = (arr) => {
    const normalized = arr.map(obj => normalizeStatus(obj.status));
    return [...new Set(normalized)];
};

// Function to count occurrences of each unique status
export const countStatusOccurrences = (arr, uniqueStatuses) => {
    const counts = {};
    uniqueStatuses.forEach(status => {
        counts[status] = 0;
    });

    arr.forEach(obj => {
        const normalized = normalizeStatus(obj.status);
        if (counts.hasOwnProperty(normalized)) {
            counts[normalized]++;
        }
    });

    return counts;
};

// Generate a random color
const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
};
const getRandomDarkColor = () => {
    const getDarkValue = () => Math.floor(Math.random() * 100); // 0–99

    const r = getDarkValue();
    const g = getDarkValue();
    const b = getDarkValue();

    return (
        '#' +
        [r, g, b]
            .map(v => v.toString(16).padStart(2, '0'))
            .join('')
    );
};
const darkenColor = (hex, amount = 20) => {
    let r = parseInt(hex.slice(1, 3), 16) - amount;
    let g = parseInt(hex.slice(3, 5), 16) - amount;
    let b = parseInt(hex.slice(5, 7), 16) - amount;

    r = Math.max(r, 0);
    g = Math.max(g, 0);
    b = Math.max(b, 0);

    return (
        '#' +
        [r, g, b]
            .map(v => v.toString(16).padStart(2, '0'))
            .join('')
    );
};

// Main formatter
export const formatStatusCounts = (statusCounts) => {
    return Object.entries(statusCounts).map(([status, count]) => {
        const baseColor = STATUS_COLORS[status] || getRandomDarkColor();
        return {
            status,
            value: count,
            color: baseColor,
            borderColor: darkenColor(baseColor),
            showText: toShowText(status)
        };
    });
};


const toShowText = (status) => {
    return status
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
