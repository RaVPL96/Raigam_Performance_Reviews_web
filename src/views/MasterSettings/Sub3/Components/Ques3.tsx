import React, { useMemo, useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Table from '@/components/ui/Table';
import Card from '@/components/ui/Card';
import Pagination from '@/components/ui/Pagination';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Tag from '@/components/ui/Tag';
import InputGroup from '@/components/ui/InputGroup';
import { useForm, Controller } from 'react-hook-form';
import { FormItem, Form } from '@/components/ui/Form';

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table';
import type { InputHTMLAttributes } from 'react';
import { Button } from '@/components/ui';
import Checkbox from '@/components/ui/Checkbox';
import type { ChangeEvent } from 'react';

type FormSchema = {
    country: string;
    channelName: string;
    isActive: boolean;
    remarks: string; // Added remarks to the schema
};

const { Tr, Th, Td, THead, TBody, Sorter } = Table;

const pageSizeOptions = [
    { value: 10, label: '10 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
];

interface Channel {
    channelCode: string;
    channelName: string;
    isActive?: boolean;
}

interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
}

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, [value, onChange, debounce]);

    return (
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input size='sm' {...props} value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
        </div>
    );
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
};

const Channel = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [error, setError] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [channelName, setChannelName] = useState<string>('');

    const columns = useMemo<ColumnDef<Channel>[]>(() => [
        { header: 'Channel Code', accessorKey: 'channelCode' },
        { header: 'Channel Name', accessorKey: 'channelName' },
        {
            header: 'Is Active',
            accessorKey: 'isActive',
            cell: ({ row }) => (
                <div className="mr-2 rtl:ml-2">
                    <Tag className={row.original.isActive ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded" : "text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 border-0"}>
                        {row.original.isActive ? "Active" : "Inactive"}
                    </Tag>
                </div>
            ),
        },
        {
            header: 'Action',
            accessorKey: 'action',
            cell: ({ row }) => (
                <div className="flex ">
                    <FaRegEdit onClick={() => handleEdit(row.original)} className="cursor-pointer mr-4 text-primary-deep text-lg" />
                    <MdDeleteOutline onClick={() => handleDelete(row.original)} className="cursor-pointer text-red-600 text-xl" />
                </div>
            ),
        },
    ], []);

    const [data] = useState<Channel[]>([
        { channelCode: '1', channelName: 'National Channel C', isActive: true },
        { channelCode: '2', channelName: 'National Channel D', isActive: false },
        { channelCode: '3', channelName: 'Bakery Channel', isActive: true },
        { channelCode: '4', channelName: 'Ruchi Channel', isActive: false },
        { channelCode: '1', channelName: 'National Channel C', isActive: true },
        { channelCode: '2', channelName: 'National Channel D', isActive: false },
        { channelCode: '3', channelName: 'Bakery Channel', isActive: true },
        { channelCode: '4', channelName: 'Ruchi Channel', isActive: false },
        { channelCode: '1', channelName: 'National Channel C', isActive: true },
        { channelCode: '2', channelName: 'National Channel D', isActive: false },
        { channelCode: '3', channelName: 'Bakery Channel', isActive: true },
        { channelCode: '4', channelName: 'Ruchi Channel', isActive: false },
    ]);

    const totalData = data.length;

    const table = useReactTable({
        data,
        columns,
        filterFns: { fuzzy: fuzzyFilter },
        state: { columnFilters, globalFilter },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: pageSize } },
    });

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1);
    };

    const onSelectChange = (value = 0) => {
        const newSize = Number(value);
        setPageSize(newSize);
        table.setPageSize(newSize);
    };

    const onCheck = (value: boolean, e: ChangeEvent<HTMLInputElement>) => {
        console.log(value, e);
    };

    const handleEdit = (channel: Channel) => {
        // Implement edit functionality here
        console.log('Edit:', channel);
    };

    const handleDelete = (channel: Channel) => {
        // Implement delete functionality here
        console.log('Delete:', channel);
    };

    const handleCreate = () => {
        setError(null);
        console.log('Create channel:', { country, channelName });
    };

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormSchema>({
        defaultValues: {
            country: '',
            channelName: '',
            isActive: true, // Set default value to true
        },
    });

    const onSubmit = async (values: FormSchema) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div>
            <div className='flex flex-col lg:flex-row xl:flex-row gap-4'>
                <Card bordered={false} className='lg:w-1/3 xl:w-1/3 h-1/2'>
                    <h5 className='mb-2'> Queation 3 </h5>
                    <Form size="sm" onSubmit={handleSubmit(onSubmit)}>
                    <FormItem
                            invalid={Boolean(errors.channelName)}
                            errorMessage={errors.channelName?.message}
                        >
                            <Controller
                                name="remarks"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Remarks"
                                        {...field}
                                        value={typeof field.value === 'string' ? field.value : ''}
                                    />
                                }
                                rules={{
                                    validate: {
                                        required: (value) => {
                                            if (!value) {
                                                return 'Required';
                                            }
                                            return;
                                        }
                                    }
                                }}
                            />
                        </FormItem>
                        <FormItem
                            invalid={Boolean(errors.remarks)}
                            errorMessage={errors.remarks?.message}
                        >
                            <Controller
                                name="remarks"
                                control={control}
                                render={({ field }) =>
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Remarks"
                                        {...field}
                                    />
                                }
                                rules={{
                                    validate: {
                                        required: (value) => {
                                            if (!value) {
                                                return 'Required';
                                            }
                                            return;
                                        }
                                    }
                                }}
                            />
                        </FormItem>
                        

                     

                        <FormItem>
                            <Button variant="solid" block type="submit">Submit</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card bordered={false} className='lg:w-1/3 xl:w-2/3 h-1/2'>
               
                    
                <div className="flex justify-center items-center">
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        className="font-xs shadow border border-block"
                        placeholder="Search Emp No..."
                        onChange={(value) => setGlobalFilter(String(value))}
                    />
                </div>
                  

                  
                <FormItem label="Name">
                    <Controller
                        name="channelName"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Channel Name"
                                {...field}
                                value={typeof field.value === 'string' ? field.value : ''}
                            />
                        }
                    />
                </FormItem>
          


                <FormItem label="Employee Number">
                    <Controller
                        name="channelName"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Employee No"
                                {...field}
                                value={typeof field.value === 'string' ? field.value : ''}
                            />
                        }
                    />
                </FormItem>
                <FormItem label="Company">
                    <Controller
                        name="channelName"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Company"
                                {...field}
                                value={typeof field.value === 'string' ? field.value : ''}
                            />
                        }
                    />
                </FormItem>
                <FormItem label="Department">
                    <Controller
                        name="channelName"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Department"
                                {...field}
                                value={typeof field.value === 'string' ? field.value : ''}
                            />
                        }
                    />
                </FormItem>
                <FormItem label="Designation">
                    <Controller
                        name="channelName"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Designation"
                                {...field}
                                value={typeof field.value === 'string' ? field.value : ''}
                            />
                        }
                    />
                </FormItem>
            
                </Card>
            </div>
        </div>
    );
};

export default Channel;