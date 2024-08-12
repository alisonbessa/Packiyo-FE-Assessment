import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar Component', () => {
  const renderSidebar = () =>
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

  it('should render all navigation items', () => {
    renderSidebar();

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
  });

  it('should toggle collapsed state when toggle button is clicked', async () => {
    renderSidebar();
    const user = userEvent.setup()
    const toggleButton = screen.getByRole('button');

    await user.click(toggleButton)
    expect(screen.queryByText('Summary')).not.toBeInTheDocument();

    await user.click(toggleButton)
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it('should navigate to the correct path when a navigation item is clicked', async () => {
    renderSidebar();
    const user = userEvent.setup()

    const summaryItem = screen.getByText('Summary');
    await user.click(summaryItem);
    expect(global.window.location.pathname).toEqual('/');

    const productsItem = screen.getByText('Products');
    await user.click(productsItem);
    expect(global.window.location.pathname).toEqual('/products');

    const ordersItem = screen.getByText('Orders');
    await user.click(ordersItem);
    expect(global.window.location.pathname).toEqual('/orders');
  });
});
