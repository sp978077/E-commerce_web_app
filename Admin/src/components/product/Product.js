import { useEffect, useState } from 'react';
import { productInstance } from '../../api/axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Divider, Chip, Pagination, Typography, Button } from '@mui/material';
import CategorySearch from './CategorySearch';
import { ArrowDownward, ArrowUpward, Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [categorySelectedLeaf, setCategorySelectedLeaf] = useState(() => {
        const storedCategorySelectedLeaf = sessionStorage.getItem('categorySelectedLeaf');
        return storedCategorySelectedLeaf
            ? JSON.parse(storedCategorySelectedLeaf)
            : null
    });
    const [pagination, setPagination] = useState(() => {
        const storedPagination = sessionStorage.getItem('productPagination');
        return storedPagination ? JSON.parse(storedPagination) : {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            pageSize: 10,
            sortBy: 'ProductVendorListedOn',
            sortDesc: false,
        };
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const categoryId = categorySelectedLeaf ? categorySelectedLeaf.CategoryId : 0;
                const response = await productInstance.get(`/productvendor/category/${categoryId}`, {
                    params: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        sortBy: pagination.sortBy,
                        sortDesc: pagination.sortDesc,
                    },
                });
                console.log('Response:', response);
                if (response && response.data) {
                    setProducts(response.data.Data);
                    setPagination(prevPagination => ({
                        ...prevPagination,
                        totalPages: response.data.TotalPages
                    }));
                }
            } catch (error) {
                if (error.response) {
                    console.log(`ErrorResponseData: ${error.response.data}`);
                    console.log(`ErrorResponseStatus: ${error.response.status}`);
                    console.log(`ErrorResponseHeaders: ${error.response.headers}`);
                } else {
                    console.log(`ErrorMessage: ${error.message}`);
                }
            }
        };

        fetchProducts();
    }, [categorySelectedLeaf, pagination.page, pagination.pageSize, pagination.sortBy, pagination.sortDesc]);

    useEffect(() => {
        sessionStorage.setItem('productPagination', JSON.stringify(pagination));
        sessionStorage.setItem('categorySelectedLeaf', JSON.stringify(categorySelectedLeaf));
    }, [pagination, categorySelectedLeaf]);

    const handlePageChange = (event, page) => {
        setPagination(prevPagination => ({ ...prevPagination, page: page }));
    };

    const handleSort = (column) => {
        if (pagination.sortBy === column) {
            setPagination(prevPagination => ({ ...prevPagination, sortDesc: !prevPagination.sortDesc }));
        } else {
            setPagination(prevPagination => ({ ...prevPagination, sortBy: column, sortDesc: false }));
        }
        setPagination(prevPagination => ({ ...prevPagination, page: 1 }));
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        };
        const date = new Date(dateString);
        return date.toLocaleString(undefined, options);
    };

    const handleCategoryDeselect = (categorySelectedLeaf) => {
        if (categorySelectedLeaf) {
            setCategorySelectedLeaf(null);
            setSelectedResult([]);
        }
    };

    const handleViewDetails = (product) => {
        navigate('/product/details', { state: product });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: '3%' }}>
            <CategorySearch
                selectedResult={selectedResult}
                setSelectedResult={setSelectedResult}
                categorySelectedLeaf={categorySelectedLeaf}
                setCategorySelectedLeaf={setCategorySelectedLeaf}
            />

            <Divider sx={{ width: '100%', marginY: '16px' }}>
                <Chip label='PRODUCTS' />
            </Divider>

            {categorySelectedLeaf && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <Typography variant='body1'>Category Selected: {categorySelectedLeaf.Name}</Typography>
                    <Clear sx={{ cursor: 'pointer' }} size='small' onClick={() => handleCategoryDeselect(categorySelectedLeaf)} />
                </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <Pagination
                    count={pagination.totalPages}
                    page={pagination.page > pagination.totalPages ? pagination.totalPages : pagination.page}
                    onChange={handlePageChange} />
            </Box>

            {products.length > 0 ? (
                <TableContainer component={Paper} sx={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell />
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('ProductName')}
                                >
                                    Product Name &nbsp;
                                    {pagination.sortBy === 'ProductName' && (
                                        <Chip
                                            size='small'
                                            label={pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}
                                            color='primary'
                                        />
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductBasePrice')}
                                >
                                    Base Price (₹) &nbsp;
                                    {pagination.sortBy === 'ProductBasePrice' && (
                                        <span>{pagination.sortDesc ? <ArrowDownward /> : <ArrowUpward />}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('VendorName')}
                                >
                                    Vendor's Name &nbsp;
                                    {pagination.sortBy === 'VendorName' && (
                                        <span>{pagination.sortDesc ? '▼' : '▲'}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                                    onClick={() => handleSort('ProductVendorListedOn')}
                                >
                                    Listed on &nbsp;
                                    {pagination.sortBy === 'ProductVendorListedOn' && (
                                        <span>{pagination.sortDesc ? '▼' : '▲'}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductVendorPrice')}
                                >
                                    Price (₹) &nbsp;
                                    {pagination.sortBy === 'ProductVendorPrice' && (
                                        <span>{pagination.sortDesc ? '▼' : '▲'}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductVendorQuantity')}
                                >
                                    Quantity &nbsp;
                                    {pagination.sortBy === 'ProductVendorQuantity' && (
                                        <span>{pagination.sortDesc ? '▼' : '▲'}</span>
                                    )}
                                </TableCell>
                                <TableCell
                                    sx={{ fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', textAlign: 'right' }}
                                    onClick={() => handleSort('ProductVendorVisible')}
                                >
                                    Listing status &nbsp;
                                    {pagination.sortBy === 'ProductVendorVisible' && (
                                        <span>{pagination.sortDesc ? '▼' : '▲'}</span>
                                    )}
                                    <br />
                                    (0: Inactive, 1: Active)
                                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => {
                                return (
                                    <TableRow key={product.ProductVendorId}>
                                        <TableCell sx={{ width: '70px', padding: '4px 2px 4px 4px' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                <img src={product.ProductImageUrl} alt='Product' style={{ width: '50px', height: '50px' }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell>{product.ProductName}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductBasePrice.toLocaleString('en-IN')}</TableCell>
                                        <TableCell>{product.VendorName}</TableCell>
                                        <TableCell>{formatDate(product.ProductVendorListedOn)}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductVendorPrice.toLocaleString('en-IN')}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductVendorQuantity.toLocaleString('en-IN')}</TableCell>
                                        <TableCell sx={{ textAlign: 'right' }}>{product.ProductVendorVisible}</TableCell>
                                        <TableCell>
                                            <Button variant='outlined' color='primary' onClick={() => handleViewDetails(product)}>
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Typography variant='body1'>No products found.</Typography>
                </Box>
            )}
        </Box>
    );
};
