const mappedObjects = (obj: any) => {
  const manipulatedObj: any = [];
  obj &&
    Object.keys(obj).map((key) =>
      manipulatedObj.push({ key, value: obj[key] })
    );

  return manipulatedObj;
};

export default mappedObjects;
