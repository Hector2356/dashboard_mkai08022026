import type { Asset } from 'contentful';

/**
 * Safely retrieves a field value from a Contentful entry's fields object.
 * If the field is null or undefined, it returns a specified default value.
 * This prevents "Cannot read properties of undefined" errors.
 *
 * @param fields - The 'fields' object from a Contentful entry.
 * @param fieldName - The key of the field to retrieve.
 * @param defaultValue - The value to return if the field is not found.
 * @returns The field's value or the default value.
 */
export const getSafeField = <T>(fields: any, fieldName: string, defaultValue: T): T => {
    // Check if fields exists and if the specific fieldName is present and not null/undefined
    if (fields && fields[fieldName] !== undefined && fields[fieldName] !== null) {
        return fields[fieldName];
    }
    return defaultValue;
};

/**
 * Safely retrieves the URL from a Contentful asset field.
 * If the asset or its file/URL is missing, it returns a branded placeholder image.
 *
 * @param assetField - The asset link object from a Contentful entry's fields.
 * @returns The asset's URL or a placeholder URL.
 */
export const getSafeAssetUrl = (assetField: Asset | undefined): string => {
    if (assetField?.fields?.file?.url) {
        // Contentful URLs are protocol-less, so we add https:
        return `https:${assetField.fields.file.url}`;
    }
    // Return a default placeholder image if no asset is found
    return 'https://placehold.co/600x600/111111/FFFFFF/png?text=MIK+MUSIC';
};

/**
 * Recursively converts a Contentful Rich Text node to a plain string.
 */
const nodeToText = (node: any): string => {
    if (node.nodeType === 'text') {
        return node.value || '';
    }
    // For block elements, add a newline after their content.
    if (node.nodeType === 'paragraph' || node.nodeType.startsWith('heading')) {
        return (node.content?.map(nodeToText).join('') || '') + '\n';
    }
    // For other nodes, just process their content.
    if (node.content) {
        return node.content.map(nodeToText).join('');
    }
    return '';
};

/**
 * Converts a Contentful Rich Text field object into a plain string.
 * It adds newlines between paragraph nodes for basic formatting.
 * @param richTextField The Rich Text field object from a Contentful entry.
 * @returns A plain string representation of the content.
 */
export const richTextToString = (richTextField: any): string => {
  if (!richTextField || !richTextField.content) {
    return '';
  }
  return richTextField.content.map(nodeToText).join('').trim();
};