type isEqualProps = Record<string, any>;

const isEqual = (object1: isEqualProps, object2: isEqualProps) => {
  // if (!object1 || !object2) {
  //   return object1 !== object2;
  // }
  //
  // const props1 = Object.getOwnPropertyNames(object1);
  // const props2 = Object.getOwnPropertyNames(object2);
  //
  // if (props1.length !== props2.length) {
  //   return true;
  // }
  //
  // for (let i = 0; i < props1.length; i += 1) {
  //   const prop = props1[i];
  //   const bothAreObjects =
  //     typeof object1[prop] === "object" && typeof object2[prop] === "object";
  //
  //   if (
  //     (!bothAreObjects && object1[prop] !== object2[prop]) ||
  //     (bothAreObjects && !isEqual(object1[prop], object2[prop]))
  //   ) {
  //     return false;
  //   }
  // }

  return object1 !== object2;
};

export default isEqual;
