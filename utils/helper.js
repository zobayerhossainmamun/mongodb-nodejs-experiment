function callAllMethodsExcept(instance, excludeMethods) {
    const allMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
    const methodsToCall = allMethods.filter(method => typeof instance[method] === 'function' && !excludeMethods.includes(method) && method !== 'constructor');
    methodsToCall.forEach(async (method) => {
        let result = await instance[method]();
        console.log('\n--------------START----------------');
        console.log(`\nCall function : ${method}\n`);
        console.log(result);
        console.log('--------------END----------------\n');
    });
}

module.exports = {
    callAllMethodsExcept
}