import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './DeliveryInfoForm.css';

function DeliveryInfoForm({
  selectedSeller,
  setSelectedSeller,
  address,
  setAddress,
  addressNumber,
  setAddressNumber,
  sendOrder,
}) {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/seller');
      const sellerOptions = response.data.map((seller) => ({
        id: seller.id,
        name: seller.name,
      }));
      setSellers(sellerOptions);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <form className="checkout-form-container">
      <div>
        <label htmlFor="seller" className="form-label">
          Vendedor:
          <select
            id="seller"
            data-testid="customer_checkout__select-seller"
            value={ selectedSeller }
            onChange={ (e) => setSelectedSeller(e.target.value) }
            className="form-input-first"
          >
            <option value="">Selecione um vendedor</option>
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="address" className="form-label">
          Endereço:
          <input
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            id="address"
            type="text"
            data-testid="customer_checkout__input-address"
            value={ address }
            onChange={ (e) => setAddress(e.target.value) }
            className="form-input-second"
          />
        </label>

        <label htmlFor="addressNumber" className="form-label">
          Número:
          <input
            placeholder="198"
            id="addressNumber"
            type="text"
            data-testid="customer_checkout__input-address-number"
            value={ addressNumber }
            onChange={ (e) => setAddressNumber(e.target.value) }
            className="form-input-third"
          />
        </label>
      </div>

      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ sendOrder }
        disabled={ !selectedSeller || !address || !addressNumber }
        className="form-button"
      >
        FINALIZAR PEDIDO
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
  sendOrder: PropTypes.func.isRequired,
};

export default DeliveryInfoForm;
