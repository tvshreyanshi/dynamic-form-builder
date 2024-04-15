export default function ComputeProperties() {
  // setup() {
    // return {
      const fieldProperties = (fields) => {
        let properties;
        switch (fields.input) {
          case 'InputTextarea':
          break;
          case 'InputText':
            properties = {
              type: fields.type || 'text',
              min: fields.min || null,
              max: fields.max || null,
              step: fields.step || null,
            };
            break;
            case 'InputSelect':
              properties = {
                options: fields.options,
                empty: fields.empty,
              };
              break;
          case 'InputRadio':
            properties = {
              options: fields.options,
              empty: fields.empty,
            };
            break;
          case 'InputCheckbox':
            properties = {
              options: fields.options,
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
