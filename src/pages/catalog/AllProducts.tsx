import { useGetAllProductsQuery } from '@/app/slices/api-products';
import ProductsList from '../catalog/ProductsList';
import { useCreateBasket } from '@/hooks/useCreateBasket';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components/pagination/Pagination';

export function AllProducts() {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, error, isLoading } = useGetAllProductsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (data?.products?.total) {
      setTotalPages(Math.ceil(data.products.total / ITEMS_PER_PAGE));
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const { activeCart } = useCreateBasket();

  if (isLoading) return <p>Loadimg...</p>;
  if (error) {
    const errorMessage =
      'status' in error
        ? `Error: ${error.status} - ${JSON.stringify(error.data)}`
        : `Error: ${error.message ?? 'Unknown error'}`;

    return <p>{errorMessage}</p>;
  }

  return (
    <div className="bg-gray-100 w-full">
      <h1 className="text-4xl text-center pt-4">All sneakers</h1>
      <ProductsList
        products={data?.products?.results ?? []}
        cartItems={activeCart?.lineItems ?? []}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
