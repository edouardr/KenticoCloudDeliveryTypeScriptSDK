import 'reflect-metadata';

export namespace FieldDecorators {

  const codenameMetadataKey = Symbol('codename');

  const generateKey = (name: string) => {
    return `${codenameMetadataKey.toString()}:${name}`;
  }

  /**
   * Get the metadata entry saved by the decorator
   * @param target - object instance
   * @param fieldName - field name (code name from Kentico Cloud)
   */
  export function getPropertyName(target: any, fieldName: string) {
    return Reflect.getMetadata(generateKey(fieldName), target);
  }

  /**
   * Decorator - reates metadata entry for the @target - Value is the property name.
   * This will then be retrieved in the FieldMap service when resolving the field name
   * @param value - field code name
   */
  export function codename(value: string) {
    return function (target: any, propertyKey: string) {
      Reflect.defineMetadata(generateKey(value), propertyKey, target)
    }
  }
}
