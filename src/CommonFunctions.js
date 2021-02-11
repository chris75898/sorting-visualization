export const CommonFunctions = {
    methods: {
        generateData: function() {
            //Get the size of the array
            var arraySize = this.arraySize || 50;
            var returnData = [];

            //Generate data
            for (var i=0; i<arraySize; i++)
                returnData.push(
                    { 
                    index: i
                    , value: randomNumberGenerator()
                    , origionalPosition: i
                    , moves: 0
                    , hasFocus: false
                    , hasCompare: false
                    , isDone: false
                    , isSwapping: false
                    });
            
            this.wasSorting = false;
            //Assign and return data
            this.records = returnData;
            return returnData;
        }, setFocus: function(focusIndex, compareIndex) {
            //Sets the hasFocus and hasCompare of the object

            //Set all to false
            this.records.map((x) => {
                x.hasFocus = false;
                x.hasCompare = false;
        
                return x;
              });
        
              //Set focus index
              if (focusIndex != null && focusIndex !== undefined)
                this.records[focusIndex].hasFocus = true;
              //set compare index
              if (compareIndex != null && compareIndex !== undefined)
                this.records[compareIndex].hasCompare = true;
        
        }, runAlgorithm: async function(library) {
            this.currentAlgorithm = library.name;
            this.isSorting = true;
            await library.run(this);
            this.isSorting = false;
            this.wasSorting = true;
        }, compare: async function (index1, index2, noSetFocusIndex) {
            //Compare the values at two indexes
            //If both values are ==, then return 0
            //If index1 has a higher value return 1
            //else return 2 if index 2 is higher
            var returnValue = -1;
            if (this.records[index1].value == this.records[index2].value)
              returnValue = 0;
            else
              returnValue =
                this.records[index1].value > this.records[index2].value ? 1 : 2;
            
            
            //Increment the total number of compares
            this.statistics.totalCompares++;

            //Update the focus index
            if (!noSetFocusIndex)
                this.setFocus(index1, index2);

            //Wait
            await new Promise((r) => setTimeout(r, this.delaySpeeds[this.compareSpeed] * 100));
      
            return returnValue;
          },
          incrementMove: function (index) {
            this.records[index].moves++;
            this.statistics.totalMoves++;
          }, swap: async function (index1, index2) {
            var item1 = this.records[index1];
            var item2 = this.records[index2];
            this.incrementMove(index1);
            this.records[index1] = item2;
            this.records[index2] = item1;

            this.records[index1].isSwapping = true;
            this.records[index2].isSwapping = true;
            await new Promise((r) => setTimeout(r, this.delaySpeeds[this.moveSpeed] * 90));
            
            this.records[index1].isSwapping = false;
            this.records[index2].isSwapping = false;
            await new Promise((r) => setTimeout(r, this.delaySpeeds[this.moveSpeed] * 10));

          },
          move: async function (index, afterIndex) {
            var removingIndex = this.records[index];
            this.incrementMove(index);
      
            this.records.splice(index, 1);
            this.records.splice(afterIndex + 1, 0, removingIndex);
            await new Promise((r) => setTimeout(r, this.delaySpeeds[this.moveSpeed] * 100));
          }
    }
};
function randomNumberGenerator()
{
    var value = Math.floor(Math.random() * Math.floor(100));
    if (value < 5) return randomNumberGenerator();
    return value;
}
