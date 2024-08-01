

const CalculateTimeDifference= (givenTime) => {
    const givenDateString = givenTime;
    const givenDate = new Date(givenDateString);

    // Add 3 hours
    givenDate.setHours(givenDate.getHours() + 3);
    const formattedNewDate = givenDate.toISOString();

    const givenTimestamp = Date.parse(formattedNewDate);
    const currentTimestamp = Date.now();
    const timeDifference = currentTimestamp - givenTimestamp;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ds ago`;
    } else if (hours > 0) {
        return `${hours} hs ago`;
    } else if (minutes > 0) {
        return `${minutes} mins ago`;
    } else {
        return `${seconds}s ago`;
    }
}

export default CalculateTimeDifference;