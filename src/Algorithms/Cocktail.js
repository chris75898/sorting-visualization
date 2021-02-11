exports.name = "Cocktail";

exports.run = async function(currentThis) {

    var minimum = 0;
    var maximum = currentThis.records.length - 1;
    var isSwapped = false;
    var i=0;
    do 
    {
        isSwapped = false;
        for(i=minimum; i<maximum; i++)
        {
            if (await currentThis.compare(i, i+1) == 1)
            {
                await currentThis.swap(i, i+1);
                isSwapped = true;
            }
        }
        currentThis.records[i].isDone = true;
        maximum--;

        if (!isSwapped) break;
        for (i=maximum; i>minimum; i--)
        {
            if (await currentThis.compare(i, i-1) == 2)
            {
                await currentThis.swap(i, i-1);
                isSwapped = true;
            }
        }
        currentThis.records[i].isDone = true;
        minimum++;
    }
    while (isSwapped)

    currentThis.records.map(p => p.isDone = true);
}