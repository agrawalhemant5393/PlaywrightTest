import TestData from '../data/test-data'

const makeAppTestData = TestData.makeAppoinmentTestData();

for(const data of makeAppTestData){
    console.log(data.testId);
}