import React from 'react';
import PropTypes from 'prop-types';

function DeliveryInfoForm({
  selectedSeller,
  setSelectedSeller,
  address,
  setAddress,
  addressNumber,
  setAddressNumber,
  handleSubmitOrder,
}) {
  return (
    <form>
      <label htmlFor="seller">
        Vendedor:
        <select
          id="seller"
          data-testid="customer_checkout__select-seller"
          value={ selectedSeller }
          onChange={ (e) => setSelectedSeller(e.target.value) }
        >
          <option value="">Selecione um vendedor</option>
          <option value="1">Vendedor 1</option>
          <option value="2">Vendedor 2</option>
          <option value="3">Vendedor 3</option>
        </select>
      </label>

      <label htmlFor="address">
        Endereço:
        <input
          id="address"
          type="text"
          data-testid="customer_checkout__input-address"
          value={ address }
          onChange={ (e) => setAddress(e.target.value) }
        />
      </label>

      <label htmlFor="addressNumber">
        Número:
        <input
          id="addressNumber"
          type="text"
          data-testid="customer_checkout__input-address-number"
          value={ addressNumber }
          onChange={ (e) => setAddressNumber(e.target.value) }
        />
      </label>

      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleSubmitOrder }
        disabled={ !selectedSeller || !address || !addressNumber }
      >
        Enviar Pedido
      </button>
    </form>
  );
}

DeliveryInfoForm.propTypes = {
  selectedSeller: PropTypes.string.isRequired,
  setSelectedSeller: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  addressNumber: PropTypes.string.isRequired,
  setAddressNumber: PropTypes.func.isRequired,
  handleSubmitOrder: PropTypes.func.isRequired,
};

export default DeliveryInfoForm;
