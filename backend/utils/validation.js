const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateContactInput = (data) => {
    const errors = [];

    // Name validation
    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Invalid email address');
    }

    // Message validation
    if (!data.message || data.message.length < 10) {
        errors.push('Message must be at least 10 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateScheduleInput = (data) => {
    const errors = [];

    // Name and email validation (reuse existing rules)
    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Invalid email address');
    }

    // Date validation
    if (!data.date) {
        errors.push('Date is required');
    } else {
        const selected = new Date(data.date);
        const today = new Date();
        if (selected < today) {
            errors.push('Date must be in the future');
        }
    }

    // Time validation
    if (!data.time) {
        errors.push('Time is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

const validateScheduleTime = (time) => {
    const [hours] = time.split(':').map(Number);
    return hours >= 7 && hours <= 20; // Business hours only
};

const validateScheduleDate = (date) => {
    const selected = new Date(date);
    const dayOfWeek = selected.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6; // No weekends
};

module.exports = { 
    validateEmail,
    validateContactInput,
    validateScheduleInput,
    validateScheduleTime,
    validateScheduleDate
};