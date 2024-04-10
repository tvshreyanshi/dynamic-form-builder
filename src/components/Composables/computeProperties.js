export default function ComputeProperties() {
  // setup() {
    // return {
      const fieldProperties = (fields) => {
        let properties;
        switch (fields.input) {
          case 'InputText':
            properties = {
              type: fields.type || 'text',
              min: fields.min || null,
              max: fields.max || null,
              step: fields.step || null,
            };
            break;
          default:
            properties = {};
            break;
        }
        return properties;
      }
      return {
        fieldProperties
      }
    // };
  // }
}
// export default ComputeProperties;
