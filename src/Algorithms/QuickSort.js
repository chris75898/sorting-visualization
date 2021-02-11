exports.name = "QuickSort";
var thisElement;
exports.run = async function(currentThis) {
    thisElement = currentThis; 
    await quickSort(0, thisElement.records.length - 1);
    for (var i=0; i<currentThis.records.length; i++) currentThis.records[i].isDone = true;
}

async function quickSort(low, high) {
    if (low < high)
    {
        var pi = await partition(low, high);

        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    var pivot = high;

    var i = low - 1;

    for (var j = low; j <= high- 1; j++)
    {
        // If current element is smaller than the pivot
        if (await thisElement.compare(j, pivot) == 2)
        {
            i++;
            await thisElement.swap(i, j);
        }
    }
    await thisElement.swap(i+1, high);

    return i+1;
}