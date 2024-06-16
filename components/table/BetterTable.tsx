"use client";
import React, { Key, useEffect } from "react";
import FormModal from "./Modals/FormModal";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "./Icons/PlusIcon";
import { VerticalDotsIcon } from "./Icons/VerticalDotsIcon";
import { ChevronDownIcon } from "./Icons/ChevronDownIcon";
import { SearchIcon } from "./Icons/SearchIcon";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EyeIcon } from "./Icons/EyeIcon";
import { columns } from "./data";
import { capitalize } from "@/utils";
import { Expert as UserType } from "@prisma/client";
import DetailsUserModal from "./Modals/DetailsUserModal";
import DeleteModal from "./Modals/DeleteModal";
import EditUserModal from "./Modals/EditUserModal";
import { requestAsyncStorage } from "next/dist/client/components/request-async-storage-instance";
const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "lastName",
  "firstName",
  "email",
  "domain",
  "tags",
  "experience",
  "languages",
  "location",

  "actions",
];

import { Expert } from "@/types";

export default function App({ users }: { users: Expert[] }) {
  console.log(users);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  useEffect(() => {
    console.log(rowsPerPage);
  }, [rowsPerPage]);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName &&
          user.firstName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Expert, b: Expert) => {
      const first = a[sortDescriptor.column as keyof Expert] as number | Date;
      const second = b[sortDescriptor.column as keyof Expert] as number | Date;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: Expert, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Expert];
    console.log(columnKey, cellValue);

    switch (columnKey) {
      case "name":
        return (
          <User description={user.email} name={cellValue?.toString()}>
            {user.email}
          </User>
        );
      case "domain":
        //@ts-ignore
        return <p className="capitalize">{cellValue.name}</p>;
      case "email":
        return <p className="underline">{user.email}</p>;
      case "create":
        console.log("hey");
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {user.createdAt.toDateString()}
            </p>
          </div>
        );
      case "languages":
        return (
          <div className="flex flex-wrap gap-1">
            {user.languages.map((language) => (
              <Chip key={language.name} color="primary">
                {language.name}
              </Chip>
            ))}
          </div>
        );

      case "location":
        return (
          <div className="flex items-center gap-2">
            <span>{user.location.name}</span>
          </div>
        );
      case "firstName":
        return (
          <User
            description={user.email}
            name={user.lastName + " " + user.firstName}
          >
            {user.email}
          </User>
        );
      case "tags":
        console.log(user.tags);
        return (
          <div className="max-w-42 flex flex-wrap gap-1">
            {user.tags.map((tag) => (
              <Chip key={tag} color="secondary">
                {tag}
              </Chip>
            ))}
          </div>
        );
      case "lastName":
        return (
          <div className="flex items-center gap-2">
            <span>{user.lastName}</span>
          </div>
        );

      case "experience":
        return (
          <div className="flex items-center gap-2">
            <span>{user.experience == 10 ? "+10 " : user.experience} ans</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <DetailsUserModal user={user} />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <FormModal expert={user} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                {/** @ts-ignore */}
                <DeleteModal id={user.id} name={user.lastName} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((key: number) => {
    setRowsPerPage(key);
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="capitalize text-commentary"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <FormModal />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
          </span>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button variant="ghost" endContent={<ChevronDownIcon />}>
                Rows per page: <span>{rowsPerPage.toString()}</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Rows per page"
              closeOnSelect={true}
              onAction={(key: Key) => {
                setRowsPerPage(Number(key));
              }}
            >
              <DropdownItem key={"5"} className="capitalize">
                5
              </DropdownItem>
              <DropdownItem key={"10"} className="capitalize">
                10
              </DropdownItem>
              <DropdownItem key={"20"} className="capitalize">
                20
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label> */}
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    rowsPerPage,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "",
      }}
      className="w-fit"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "center"}
            allowsSorting={column.sortable}
          >
            <span
              className={
                column.uid === "actions" ? "block w-full text-center" : ""
              }
            >
              {column.name}
            </span>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {/** @ts-ignore */}
            {(columnKey) => (
              <TableCell className="text-foreground">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
