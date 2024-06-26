import React, { useEffect } from 'react';
import {
  reactExtension,
  Banner,
  usePurchasingCompany,
  useApplyNoteChange,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const purchasingCompany = usePurchasingCompany();
  const applyNoteChange = useApplyNoteChange();

  useEffect(() => {
    async function updateOrderNote() {
      if (purchasingCompany) {
        try {
          const result = await applyNoteChange({
            type: 'updateNote',
            note: 'b2b order',
          });
          if (result.type === 'updateNote') {
            console.log('Order note updated successfully');
          } else {
            console.error('Failed to update order note:', result);
          }
        } catch (error) {
          console.error('Error updating order note:', error);
        }
      }
    }

    updateOrderNote();
  }, [purchasingCompany, applyNoteChange]);

  return <Banner>Your extension is active</Banner>;
}