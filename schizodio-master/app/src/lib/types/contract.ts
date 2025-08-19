// Generated types for SchizoNFT

export interface TokenMetadata {
  id: number;
  hash: string;
  imageUrl: string;
  metadataUrl: string;
}

// Updated contract ABI for Schizodio NFT - Mainnet
export const CONTRACT_ABI = [
  {
    "type": "struct",
    "name": "core::integer::u256",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      {
        "name": "quantity",
        "type": "core::integer::u256"
      },
      {
        "name": "payment_token",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "admin_mint",
    "inputs": [
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "quantity",
        "type": "core::integer::u256"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "function",
    "name": "set_payment_token",
    "inputs": [
      {
        "name": "token_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "is_accepted",
        "type": "core::bool"
      },
      {
        "name": "price",
        "type": "core::integer::u256"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "set_payment_token_price",
    "inputs": [
      {
        "name": "token_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "price",
        "type": "core::integer::u256"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "set_mint_active",
    "inputs": [
      {
        "name": "active",
        "type": "core::bool"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "get_max_supply",
    "inputs": [],
    "outputs": [
      {
        "type": "core::integer::u256"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "get_total_minted",
    "inputs": [],
    "outputs": [
      {
        "type": "core::integer::u256"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "get_payment_token_price",
    "inputs": [
      {
        "name": "token_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ],
    "outputs": [
      {
        "type": "core::integer::u256"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "is_payment_token_accepted",
    "inputs": [
      {
        "name": "token_address",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ],
    "outputs": [
      {
        "type": "core::bool"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "is_mint_active",
    "inputs": [],
    "outputs": [
      {
        "type": "core::bool"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "struct",
    "name": "core::byte_array::ByteArray",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      {
        "name": "token_id",
        "type": "core::integer::u256"
      }
    ],
    "outputs": [
      {
        "type": "core::byte_array::ByteArray"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "get_token_uri",
    "inputs": [
      {
        "name": "token_id",
        "type": "core::integer::u256"
      }
    ],
    "outputs": [
      {
        "type": "core::byte_array::ByteArray"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "set_base_uri",
    "inputs": [
      {
        "name": "uri",
        "type": "core::byte_array::ByteArray"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "set_contract_uri",
    "inputs": [
      {
        "name": "uri",
        "type": "core::byte_array::ByteArray"
      }
    ],
    "outputs": [],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "get_base_uri",
    "inputs": [],
    "outputs": [
      {
        "type": "core::byte_array::ByteArray"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "get_contract_uri",
    "inputs": [],
    "outputs": [
      {
        "type": "core::byte_array::ByteArray"
      }
    ],
    "state_mutability": "view"
  },
  {
    "type": "impl",
    "name": "ERC721Impl",
    "interface_name": "openzeppelin_token::erc721::interface::IERC721"
  },
  {
    "type": "struct",
    "name": "core::array::Span::<core::felt252>",
    "members": [
      {
        "name": "snapshot",
        "type": "@core::array::Array::<core::felt252>"
      }
    ]
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc721::interface::IERC721",
    "items": [
      {
        "type": "function",
        "name": "balance_of",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "owner_of",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "safe_transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transfer_from",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "approve",
        "inputs": [
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "set_approval_for_all",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_approved",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "is_approved_for_all",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC721MetadataImpl",
    "interface_name": "openzeppelin_token::erc721::interface::IERC721Metadata"
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc721::interface::IERC721Metadata",
    "items": [
      {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "token_uri",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC721CamelOnlyImpl",
    "interface_name": "openzeppelin_token::erc721::interface::IERC721CamelOnly"
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc721::interface::IERC721CamelOnly",
    "items": [
      {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "ownerOf",
        "inputs": [
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          },
          {
            "name": "data",
            "type": "core::array::Span::<core::felt252>"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
          {
            "name": "from",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "to",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "approved",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "getApproved",
        "inputs": [
          {
            "name": "tokenId",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "operator",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "PausableImpl",
    "interface_name": "openzeppelin_security::interface::IPausable"
  },
  {
    "type": "interface",
    "name": "openzeppelin_security::interface::IPausable",
    "items": [
      {
        "type": "function",
        "name": "is_paused",
        "inputs": [],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "AccessControlImpl",
    "interface_name": "openzeppelin_access::accesscontrol::interface::IAccessControl"
  },
  {
    "type": "interface",
    "name": "openzeppelin_access::accesscontrol::interface::IAccessControl",
    "items": [
      {
        "type": "function",
        "name": "has_role",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_role_admin",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "grant_role",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "revoke_role",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "renounce_role",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "AccessControlCamelImpl",
    "interface_name": "openzeppelin_access::accesscontrol::interface::IAccessControlCamel"
  },
  {
    "type": "interface",
    "name": "openzeppelin_access::accesscontrol::interface::IAccessControlCamel",
    "items": [
      {
        "type": "function",
        "name": "hasRole",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "getRoleAdmin",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "grantRole",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "revokeRole",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "renounceRole",
        "inputs": [
          {
            "name": "role",
            "type": "core::felt252"
          },
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC721EnumerableImpl",
    "interface_name": "openzeppelin_token::erc721::extensions::erc721_enumerable::interface::IERC721Enumerable"
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::erc721::extensions::erc721_enumerable::interface::IERC721Enumerable",
    "items": [
      {
        "type": "function",
        "name": "total_supply",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "token_by_index",
        "inputs": [
          {
            "name": "index",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "token_of_owner_by_index",
        "inputs": [
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "index",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u256"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "ERC2981Impl",
    "interface_name": "openzeppelin_token::common::erc2981::interface::IERC2981"
  },
  {
    "type": "interface",
    "name": "openzeppelin_token::common::erc2981::interface::IERC2981",
    "items": [
      {
        "type": "function",
        "name": "royalty_info",
        "inputs": [
          {
            "name": "token_id",
            "type": "core::integer::u256"
          },
          {
            "name": "sale_price",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "(core::starknet::contract_address::ContractAddress, core::integer::u256)"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "default_admin",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "pauser",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "minter",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "default_royalty_receiver",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "royalty_admin",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "treasury",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "base_uri",
        "type": "core::byte_array::ByteArray"
      },
      {
        "name": "contract_uri",
        "type": "core::byte_array::ByteArray"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
    "kind": "struct",
    "members": [
      {
        "name": "from",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "approved",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "key"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
    "kind": "struct",
    "members": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "operator",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "key"
      },
      {
        "name": "approved",
        "type": "core::bool",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::erc721::ERC721Component::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Transfer",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Transfer",
        "kind": "nested"
      },
      {
        "name": "Approval",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Approval",
        "kind": "nested"
      },
      {
        "name": "ApprovalForAll",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::ApprovalForAll",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_introspection::src5::SRC5Component::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "openzeppelin_security::pausable::PausableComponent::Paused",
    "kind": "struct",
    "members": [
      {
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_security::pausable::PausableComponent::Unpaused",
    "kind": "struct",
    "members": [
      {
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_security::pausable::PausableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Paused",
        "type": "openzeppelin_security::pausable::PausableComponent::Paused",
        "kind": "nested"
      },
      {
        "name": "Unpaused",
        "type": "openzeppelin_security::pausable::PausableComponent::Unpaused",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
    "kind": "struct",
    "members": [
      {
        "name": "role",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "sender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
    "kind": "struct",
    "members": [
      {
        "name": "role",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "sender",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
    "kind": "struct",
    "members": [
      {
        "name": "role",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "previous_admin_role",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "new_admin_role",
        "type": "core::felt252",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "RoleGranted",
        "type": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
        "kind": "nested"
      },
      {
        "name": "RoleRevoked",
        "type": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
        "kind": "nested"
      },
      {
        "name": "RoleAdminChanged",
        "type": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin_token::erc721::extensions::erc721_enumerable::erc721_enumerable::ERC721EnumerableComponent::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "openzeppelin_token::common::erc2981::erc2981::ERC2981Component::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "hello_schizo::SchizodioBrother::Mint",
    "kind": "struct",
    "members": [
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "data"
      },
      {
        "name": "price",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "hello_schizo::SchizodioBrother::AdminMint",
    "kind": "struct",
    "members": [
      {
        "name": "to",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "token_id",
        "type": "core::integer::u256",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "hello_schizo::SchizodioBrother::Revealed",
    "kind": "struct",
    "members": [
      {
        "name": "revealed_uri",
        "type": "core::byte_array::ByteArray",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "hello_schizo::SchizodioBrother::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "ERC721Event",
        "type": "openzeppelin_token::erc721::erc721::ERC721Component::Event",
        "kind": "flat"
      },
      {
        "name": "SRC5Event",
        "type": "openzeppelin_introspection::src5::SRC5Component::Event",
        "kind": "flat"
      },
      {
        "name": "PausableEvent",
        "type": "openzeppelin_security::pausable::PausableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "AccessControlEvent",
        "type": "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event",
        "kind": "flat"
      },
      {
        "name": "ERC721EnumerableEvent",
        "type": "openzeppelin_token::erc721::extensions::erc721_enumerable::erc721_enumerable::ERC721EnumerableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "ERC2981Event",
        "type": "openzeppelin_token::common::erc2981::erc2981::ERC2981Component::Event",
        "kind": "flat"
      },
      {
        "name": "Mint",
        "type": "hello_schizo::SchizodioBrother::Mint",
        "kind": "nested"
      },
      {
        "name": "AdminMint",
        "type": "hello_schizo::SchizodioBrother::AdminMint",
        "kind": "nested"
      },
      {
        "name": "Revealed",
        "type": "hello_schizo::SchizodioBrother::Revealed",
        "kind": "nested"
      }
    ]
  }
] as const;

export const COLLECTION_CONFIG = {
  CONTRACT_ADDRESS: '0x077485a949c130cF0d98819d2B0749f5860b0734ea28cb678dd3f39379131Bfa',
  MAX_SUPPLY: 999,
  BASE_METADATA_URI: 'https://techshaman.42024769.xyz/schizodio/json/revealed/',
  UNREVEALED_METADATA_URI: 'https://techshaman.42024769.xyz/schizodio/json/unrevealed/',
  PAYMENT_TOKENS: {
    // Mainnet addresses
    ETH: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    USDC: '0x053c91253bc9682c04929ca02ed00b3e423f6710d2ee7e0d5ebb06f3ecf368a8',
    USDT: '0x068f5c6a61780768455de69077e07e89787839bf8166decfbf92b645209c0fb8',
    DAI: '0x00da114221cb83fa859dbdb4c44beeaa0bb37c7537ad5ae66fe5e0efd20e6eb3',
    WBTC: '0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac',
    STRK: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  },
} as const;

export const TOKEN_HASHES: Record<number, string> = {
  "0": "5b377cf6c45ad24030d367503854fc6b2ed621ee53ad1bcb36b4c5907f5efd52",
  "1": "82f41328c4c084676aa2a51348b366f9689bd6364f145613a2da8699a03adccb",
  "2": "e1e4a094b12d545f97e697e0f1139336872192c7aa61d11aed6248d13d840211",
  "3": "8b611f37584d2f2e429c1532c72675805a048e92b616662fa9281679ffc7dbed",
  "4": "1756b7f080d7aef7de978588a9a98d161acd9d4b0ae2c44129e5988724d20757",
  "5": "2afad054892d6d81786c32b1d3cc7fd3e7c8dbe700457e439245507665b18b59",
  "6": "85daa120a1aaadd2a5e183a56633be5699294b07f5dea58aaff000bb4b860f29",
  "7": "8dd686077727e9bded985c7812e1c52a0a8121efe7e1ab6b8ea482b2378d93d8",
  "8": "ae6318554d5086c6212d85b4bfc5948af889948dd0ad2a248848cec53bcd4f6e",
  "9": "65788d0d9470d21d50e2784ffc6bdcbe064bed8f48e54d0732fbf6cf6c563d6e",
  "10": "a957cb652aa71bb4dcb61fb3287eb1a8027203d53b24e93d96ccb0ebd6c2d65d",
  "11": "cf163e13061015c73a5ee3fc7727b47a65e362f8be04e631f9303daa46614804",
  "12": "aa6b4a1fc27981f2c6ea9e4ca2a6f9d5f201858623326439e9e7a83a31c24c01",
  "13": "e6bdc6cbe978a46f9f0cfefc838cfd287867dfcd6c8999285dd3a45961f28850",
  "14": "f5764fd5cfc8153d69c643b97a607c9f732b058519dc1db86faef171d8546be0",
  "15": "0dad01fc355c3a53f261847c1dc1b825835bac61581ff6cff047eecefe7a6c82",
  "16": "aa7a514c513e50369c6813a3224cb04fb9c98849399c6f87e28bdbf954f7d03e",
  "17": "2ae0f178ba19b95262774667181b365c783c1e7a36b46325d4f10676615c4008",
  "18": "e7d99fadd7fae19845086a1e45424c5886e339d0eb899777cb58d7387efea4c0",
  "19": "8142009e3a09ceb5de6ef67611e00022c4fa37441b711ab031a38a92c45d958b",
  "20": "0fbf78ffb3042632433af0a785de9ec289d944d6728d075943a3db7c862460be",
  "21": "7844a0c29d16d52b89c17a082cbee6e8994214df16327eb5e5addab784e9c6df",
  "22": "a2640653b507b8d2965598110d5cf657f9c854e24f6a5a080c81a3733b020abf",
  "23": "fcc180c70c69175ef8e36686bcc1335bd1a1bfcae59da08451a67b932ced562a",
  "24": "fe218a08120898253834ec3a6f26319badfc23b9907b283778b3b70e3dea2f8c",
  "25": "20989e4ed55505eca4ced5573803e5188a8a3c573da0a99bd79cbb63b2a81054",
  "26": "dd05a8cfd542e887f1e498251257a24efd7cdd8290d48751029957a711dc695a",
  "27": "3f1306f6d11cad429a270f6ba6d176828c18631aeed90401256c470a58ea0bfd",
  "28": "58262b46a45aa17c1271a3e45d91bdd7f7ac57ea140224f81b7806ac173102e0",
  "29": "e5c36100e03bddcd9ee309ea7a00f6ae224a2026914ec6c72310fa7183a01d12",
  "30": "9cd604d8f5681be9e1e439cfb8eab853b675931f8d9d77e545232cb579d11d0c",
  "31": "19990deae4b4fcaa8221b1437d81275f601020d234add12dd50ac79de874f2b9",
  "32": "126826802027ef32237a0389d70cf7565b017f8a31753f09cf7886ba029d6b98",
  "33": "c60dd12be2706808f21ddd8cb8dc40193e6759c90649bbc44205dc3adf4d8a7a",
  "34": "fbbfa98b06da839aad88a5e225bbf2ddc66b72e207fcfd75ecc1b374244ff081",
  "35": "c5fce11f8da6fd95b3df265813ca686913e0842a493646cf860b24af1dc55c1f",
  "36": "4343ec2750e758cd0aa9da8631d51c448edd17fb9bc3c425e0bc20eb8ad4a4cb",
  "37": "6b6d1cc33f95544d9d3fb542da7ddf5223df518793c3453188cee51ffd5f04c6",
  "38": "32276f1347e8a10c5052cb450976cb05565eb38629e3d07229618658d9d8c248",
  "39": "10a91bc8adf510281b41dd75383e0758e80076d9dd99ee2e6c9c9b0c8dd0d507",
  "40": "5d0abb97f4df025da4998fcb9200deadc62a9d6b0e23f8d7ccf4f4230e5aca1d",
  "41": "c072c90dc99f1d883db738e93a49e28ca203130475b681cf52a7ca219b5a063f",
  "42": "181afcfb4982da5aa0ad7351e08061273c171a7b86b995f50443005d0e15ab35",
  "43": "56376e3d60631436ce0d08cb5298808017e9813e6c6368ff9f909b516eb39907",
  "44": "f2bd5681ce2597b638e7d7ec4f8b6ba064b51f91603e0f559a4ce44df588de0e",
  "45": "b4f74890cffa99e8d50c26fc38db9fd5e19dd308ef636493971321a9d54daa17",
  "46": "cf697cd1eddce5cbde929438366706b86b7c6598f3576055fb8451a646bce731",
  "47": "962e50722ed03da0ee95836152c38ad564c27b292ea07b84e5179ac97b5c92d7",
  "48": "00edaafd0c9ad2370242c8f62da9e422a80a6307df7dca7b01471a0efff1e30f",
  "49": "5239bffd1e8ed0b64d0d883ebef59b5e37c6cf55a0627fd6fa378f6c420e42b3",
  "50": "6121e6ef66794b8335fd0f6ad114dafeeb1352c8327586b6884cd6b2dae0ab23",
  "51": "54b7d58850e064700eba69492ea9d7505d880c98dc6812b91ff8915fabbc7a06",
  "52": "802b17be073efd85074cc0b331af82305be5d0245f4e9b634ea8d2fd1e3dc92b",
  "53": "a0cc59ca84f2ed9869789b0bc09f6d9e42ce6985ac2d7e6c42b46a59b32fd9eb",
  "54": "07e455464628694b85bf65e38e641f6b4b9501f511fbe0422369000071817814",
  "55": "8d841caba3eaad5f41fd2c412810a137f57c7c1ca6d95f38b6441dfd291b44c5",
  "56": "432159ffbcd94a135cb7a1d3167a88d6e72a6177f80c7d47b4f30ba91fe9232e",
  "57": "e0ef53004ba8d5a1ca07f0b6e9b9aa8045c998437ea4d2148193b968d74789e9",
  "58": "b57009effb2d2654a8dabd9a833fbf4e1986892b21e472007dff7ee07ec96445",
  "59": "e1352098e4b4681df782c66abf6bada12f0317733d64d16440f48594ca210b7c",
  "60": "fbb4251ae1513b8819f65bcf790a330e56571ef9febc295c515a3722dc80af14",
  "61": "99edc0a031294f8d1be8609d54e3a0b431caf04619ba14cb61455dc1ead89f0d",
  "62": "16c1b7cd08c055e43c3ee4d47a6cb2f247f4001cd79db3d33e7b4aba1bea09c9",
  "63": "cd155ccbc124940fea69e2f39936e5fc09fb17ef72c73a249259520f2e855eae",
  "64": "9e14cb2d9e831d0375bc93766f783d2e97679b2570aeb88790e02e91067b9157",
  "65": "e4ac98adb134b235d57e36faa353d089721b3a44cd4a9b9e8c5cc69bbef331a5",
  "66": "d914050ccc31b9d5157c94541dd9af632f929ce7d6d4c5cc56c69b74d7560aaf",
  "67": "01917a13b470d09a72b39b23d03f8a2bd10f73424203671fbcf2f2335b3cf677",
  "68": "847bf5b8cca3f00df75f11fc280721e97c3a944a3007e9024e65aefb3a735152",
  "69": "c16df60e3a7f35ee36c2fe59048113add94220a3a04cd80b35b1dc69d3619794",
  "70": "e950539caf6c3be6321b929ad87188473a5509a53780c1deea17288cf843b4e6",
  "71": "47c8adc68e8eba416ce8e3b93cc87050026542a9d6095ecd367a5bc81c2d7c10",
  "72": "250fd433e3586b91f2e6d115ea7ac38f3a124ba471df0b1340b742b8cd8d475c",
  "73": "182c28399995813e36343afc493751abcf1ddddbed4fa4fd51c56f48a9a157ef",
  "74": "767465bde8a54bf4c3502c8667cd4806d9ee11a3057e4578be3f2351a7cc7a6b",
  "75": "7f5ff63bb3ef97cc8d9984d82d036683ed3193d8d55f3ba9ead703ff19e783b8",
  "76": "c03dd1e00c1e4a8841d477a2092988a9161f9bed10a327108f3d3548844f995b",
  "77": "3f0453fc4c7405e8e328db78f828643c44d4bb2d93a51a026e52b1cdc993e14a",
  "78": "9a2c001596ba6069e4eac014115031c8c88a11fd3dd2ecb97be7838538d52e11",
  "79": "3a4df1546f7c2c605467555940a45952baec3f8ae2dd19d9c7c35e322f03e20b",
  "80": "28f65e8af373521ce41065d864685e4dd16d5954ad3e43fb9fab252123b02605",
  "81": "9430391c94dc997565b29c61283a80b93d4c2846ee4ab7cd3ea8f9adfdaca030",
  "82": "851ba2b823405acd425388f7a076164ca54b2543920a1baa54ee5b278c76dce9",
  "83": "8d12f103f9b8f1908e93018479ab91aa106b65db6a6586a5c861fe61ab24fa1e",
  "84": "14f30d244f0d3db7aad9a55d6b252785b2e9b6b75de543845ed8a3c8db7acbfd",
  "85": "6a08cfbd927facb947b54fb18bc5ba6f1e77a4972bf07e03c83cd7f9063cf3c1",
  "86": "ada90fbac30568d395301efd2da4d5de11d7fdeef5ad651ccc210c114ecb2c4c",
  "87": "d3c9ddffb917615c0106a34193a2b3d759cac7863741fafcd794b6f159ee5ae9",
  "88": "20281ffbd9c85cd688e43ba01560792e6e881aca64b5f5e1c9819ccb1c7869a1",
  "89": "8bf2d9ec9bb19906b5c809228a20ef5143f3b1ecc1c298e41516945502036a30",
  "90": "23c9de67406cc74179a680efa92184c32d6641721d2a107e87a640d9e0abac48",
  "91": "aa3c4b0bad9ed243f4f2b5925d9e11e3215058a7ff5fe2515a9207cae366df78",
  "92": "912cdca8d1c68a260cf16eca3a16e3cd2152c6756e28fb044bb3ca8e5c6cbc8b",
  "93": "751a214e96ac2536f262c5b7d97219c0a6ac62707bbb853ecb3643fc953e162b",
  "94": "7c14d4a07a0290dca44264eaf9d47ecac0aa1c7200f020d5cc1eb4c73e60c65e",
  "95": "b8075d5ea21f9edf85c6aaf26fa523b81d31e1d99705ac7bd363ef48ee5d1c6c",
  "96": "43008c2e640575e6386d9af8b6c63bfcc75e41a42d2793ec7e1eaa8c386b72bd",
  "97": "d0124b9f8a585e604452b65b20dea6506ea738dd25ead184d5c1e42d7ce4e7b0",
  "98": "7f6f15f125ea67c870e4a3f00d5b9af16bdd04287be8294ecf9f65a8b790eb9d",
  "99": "d13e3621ea204e96b195eb1c293ca7f3ea4b4f76261b8d8ffc2a056fc4ca6512",
  "100": "9da6786ac05c2769e2192f6a2966e2705330945aa8b4989fec3d580944f89230",
  "101": "56d4385c7f7188be2ec2c48ddf36ee2c4a0998b7504f3a625eea45497a98a547",
  "102": "d5f0487baf0c2b1c3ce09e7053b6bdf944a77a019451b386500c03765205bc56",
  "103": "8e7e0dab5eacf18beaec4575b1c09d66867be8bbf33d4c34cdb0d753488ca6e0",
  "104": "93b95e1dcf78ea8737dbc572f7157c87943885cea83ac1324e662e16ddd57464",
  "105": "7bbe75cbee285cf92e4111589b571c643bc00e611e2afb6c5b421c55f4ac122c",
  "106": "3c5460431f437e7013d32c18fa077c15ebf317aface386f15bd7669b0a0e1ccd",
  "107": "11253dd2cce211f19029a674c46a3cb7cdf85aab84875aed1ae05aa2c2203236",
  "108": "f35776638d384e573a94ce03c94ade041af2f4a1d84d336f44a5cc91ca8e24e6",
  "109": "cc954d62d1b8b064e9982586c8de5e33eb567f9ed92400bbfe7b2ac708573356",
  "110": "e3848dbdcccd92f4a18b8e4de36cc26680d78d3d8909a202f713334cb3f6a169",
  "111": "55423ae8b42699a95c225cf87cb15c000d2fed69f577e0e970aaea37118c0702",
  "112": "7e866b559bd5ac2d5e2648a65aaa68ee8508ab8fd18997250af16560288dfc7a",
  "113": "81f5973b56233e3cbaf8a34e6f9a1e570ac10eb778b82b8409eecb58e22e6a6a",
  "114": "ee6dc8a4857a9af716e97e1b3d8307d1c7205cab9d59df2b121882de960b3e9d",
  "115": "9e44515661d1367c16f1895f76ca0a0c1df313108173a820c5cffafa15fc03e9",
  "116": "f2d69aa000c8a79b3fbea2df6f5cc5595e1059d3373874c547874c9bffbac482",
  "117": "791edcd76148bb52a76f951004a81c225d5afd2e1a2367366f7ec5acb2897ba3",
  "118": "f1178d5090c8318935ba8a619bd39f66fa7d60d46bb461966538d48358f4b13a",
  "119": "6d5c2411eeefaf05ac3bc44ff16c51716b24fce5a3dbb8e8db6776554f7670b0",
  "120": "3bc496502e7ddf13be82ea320c63847f9c51a46596aab80eaceb96938db96453",
  "121": "687a5ad72f86843e8bdcb80ef72636900f7010a4b052a02de018e92bdf01da81",
  "122": "9d4491f36c1f6283a57afa9b8b9f973931f62d0026af6440e1d3456cdccba3f8",
  "123": "d2b265de9b76992849d7ebd9f24a2a8ee89be833f39e8a1c0e3be15cf89bbaf5",
  "124": "27d5199b47710fda3dc3e1be3c08851d0d6ef5ef62bf7014819d58fccfe58bfa",
  "125": "e4ec0d0e7671921e3852924478605d51bc6025d887dab5d865e205fb8a6a8bb7",
  "126": "d0eadc2dc963fd5bc9dfa5a6c0b2bf8b5619c6345c68389eca96ec765647812b",
  "127": "0162e4878527acb127d0f032452bac769415febaacea2aa3ff1cea772cb5bf3a",
  "128": "7eb67ec5e47e3e91dce1eeaefbbb476b5205c15e6e8bb26dc0ea5a3c1a14ff7e",
  "129": "6b5a1fe4e9cc1bbcd9e8976ab5c7092c43793c03c7c593e804cc1c70e2114ef3",
  "130": "d0a75101e28863b9a87edaa269ae61fef119b195d9bd47b80665e0011528e3ea",
  "131": "ab764a82923af86f33a461b1d1e718d5c171f305c9cc0f5afa8e861029d9f7e8",
  "132": "c674f8222aab8ce78e98b0d61dce1aabbaca8f2fd1f7be29e94b881183ac7857",
  "133": "06f59455a8075120591f4dc18847bbaeee7dc3ff468ef3d3640df5bcb13f2e96",
  "134": "b222c543871dbdcba8e942c014a21615a8674aec1f2c42eb76af501d4f72c0c2",
  "135": "6908c8f3f59ebe115b53f4ff1ea1c08a395d3f372a1eee67ae30c563383d41f8",
  "136": "0d48b169a9aecd1d5499789bbd19568d44115ebb40d31c7cf675e015af3411f9",
  "137": "9b0d97d03d8b694ae64091db31111a39e34b2e0c466bf1b823e89ff73b00ff3e",
  "138": "d734319c3997ddb2e9d874231b0e257fd4ef5612aef1b754c051372df13e609f",
  "139": "2139df6b091775be703a11a37801937d2329c8eff3e8c67f97edd90fdbda4445",
  "140": "b2e9011fb176b218705b16dc5839aa47e7c6657bdc4c26a73d5a9ca106b4b808",
  "141": "3883a971198366d1afddc8ece4b97c672d7d541d969f69387c38ba1eb9238bc2",
  "142": "30728d9df594b19210847ad74c97ce7238afbb69dffc62c31aa86ab598843948",
  "143": "e9397b130c28308b8b7bb4eb9ace71b559b678e0947837ea3376b76dc48c7972",
  "144": "8943249dd944304ded797d7d7c421adf43f8ee9038ff4ee8f6606431a55d8c0a",
  "145": "dd1b39ee2b2f3d145f8b75e3e187b34767dab6121554ad75c83744823f22895a",
  "146": "388774e35b82336dbab1f81665b7438b816404f7a6cedb7e6454699df92c2e54",
  "147": "b02ab88e06bc613084f59c9647340dc0c5e02c19b255392999e341b456b706de",
  "148": "0f27fca96822dece7d7eb540b49d10f2401e69ba07561870c40a90a31e9acd81",
  "149": "f0d4fb7f088cee77f14b6d84bfed8c8b053f0a9df978fe5fe1af7be82ad56a80",
  "150": "ecea3366aa8930ffc152d5de60f414c86d421d672082b73eef0d3847db1b955f",
  "151": "92c0bc8da0536e483e3ed3f4d3646f779c6bf3c946ff6c634b7f3647984ac344",
  "152": "774d78bf6df6adc2969cb58fa3c4b92c01f7b5c52b37bbcf41c3c36af091f960",
  "153": "1d04273027af768e9ec02d9af50338c373efba73bbe6012dfb94961eb7a092be",
  "154": "408cadbb344988ddab696e0503741964264b64b6ea73bfdf0034e3fb1700eab5",
  "155": "daf86cbf2b21f9833cefb648bf5774adfa50b6166b636fb556b4e2c4334032b7",
  "156": "aaa2115fdffb5c46bc900a9e414b8b97a2623dbb1d7445e1c66876bac72d5b70",
  "157": "9feeeb4933933767b32f4473421ad81f11de8c002050387034e82e4d53366f36",
  "158": "151c8e52529c0e8e2c864dc6261ec2291dadafaa9eb85dbdca44eb3fb80420ad",
  "159": "72ca5c92a10de9345c5a9bd374dbc4a238bb4181db410090021b6cc6a5ec4ccd",
  "160": "f9567c0361b88b561ab6f24f68887a4fb281604dbd25defeeb10f5e82a59fb6a",
  "161": "84705aed003ff070d7830b8b83bd03a2582d5ab1cf75e32c236e93bdb517568a",
  "162": "910cb0706bb0823fb5f864bffe3eb86dc9a4eb923a1b585b572a7d5a54c886bf",
  "163": "f1a34dd3edf630c7e055cfea569f99b8c68e6c00df9c2f54ab20fc079af0a010",
  "164": "6b641bdd5b142f4a93f5d41d27e6da4527edc9535428d507eff2f07cf5ea7009",
  "165": "cdd1d9191b08b6aaf12b1341135f6ff11f411fbdfd2fa57e7d283651ed915ef7",
  "166": "508de359c7f70673d8424147dcfee3828986cbcab198a0dece5cf04875adb708",
  "167": "34b009a3b1a2a1a33dea3e46a99b0d5da237c7a151a4085da3aa768f183fe987",
  "168": "0b08b1a6a594b558fffd197b7c7a7f2b75d8cdf587e0e83f2de9087963c9c7d0",
  "169": "f0756efa6ecae3e7e6a975684f4f8ab5414488d70d5604a2771df2a04d537deb",
  "170": "04e828f966ed7a0091203f5d44800979674ea5467bde90d5e29906a1c81faef5",
  "171": "67b35032f0c6bed81f3aa65cdf03280e3c8b5dd7f1068cd1c91d5a273df8f021",
  "172": "0e03b57ce5ab170e6391529b35c8f5e7b631ac7e2772e87a13506678e4c96227",
  "173": "05c59a8e56ccb7c4ad40c041757006740a5cc90948d7dbe77f05426057366d81",
  "174": "141925ceafd812961af563896a2871d198b9cad4c8dab4a4f96a761bdeed2133",
  "175": "5e6111c7adaf93bc66e5c57e40af4265bc8effd024cb880f467a7ed09a027239",
  "176": "326e0eda15e61b81ddb93b86a80d17420a88090a9f13248eeac14fbbc7f73c96",
  "177": "b70a3bb6c7af4e8fccfe6934cc593cf9ba869031ff85dd79ab2348825da21191",
  "178": "182377b57789cd42032c636ca02ff0f129ab8fee9b254579df77bf75265b9c59",
  "179": "f2c54344ef1260db0e2f49b7607478423877bccfc079daf9ca6e4e714094aafa",
  "180": "93418e35b44eebe076fb1ba261ddb8d015749eddfd3ecfea511e702d1df789b8",
  "181": "0916e8f7758bf4a366734877adf78e412abd55ee00498da808dc818317e85988",
  "182": "9d28fc82dcaa32651324d21ff018fc2c53748e75fae783e7e6f0c7243940c46d",
  "183": "9816ea68846ae56c6373d5b32c3fc143538ff4361d478427c84e27400e5ab7d7",
  "184": "f316e114d4dacbc10a405387aa0a4e5a89b46b14a36e1707b7235625c3c50173",
  "185": "21ff2b2f2cdf557ae1d1d8e282940126d8af122c5e8d621804ff65841326833b",
  "186": "f482f6091b00d60cfb93a30c972cdb613d606c77b5bfa11800ec2037ae07bafa",
  "187": "28cd55b1214f2d038475e9037598421b89e007bfb687502a502f0c01bac56c7c",
  "188": "bb2631818ab7b63937665de3822abd892af01425ad7228a787159398448d354b",
  "189": "879e015b52ba7c74aed03fbe535b318d9a99fc07c9553260d4e187d09984449b",
  "190": "403532d68af49fe8a2122c80271f460d5e52f5b090ee03cef0627a5ad9026816",
  "191": "b1ba5f9740cfcbb777120f27f520b8b0aa2bebfb007261a5cf211932518411ee",
  "192": "0de02f719c4e78fa80f674f91d61321f94b884c9c3fe90fdabed4536cc8e97c8",
  "193": "b54146dc2fddd1da7390ffc12ef4b0f171f7aa37a4b6ab2f750a30f687be8273",
  "194": "2cb96b1ca8a288a163643c548f7ec3ea8ca0b04edd0d781b773fe810d7722157",
  "195": "4648bd2d43afa80bf0a8782633cbda93027acf65512a985c44527783107dbca3",
  "196": "62f8a0c880eeef09e2f49257dda54424ca347eff1cba53536cf51d3734f2680f",
  "197": "c41d31cde0ace33072566f4df9c1bfd3236bbd18fc4c90a498197e87db7b3ed9",
  "198": "a12a91f8b85a79a6fcdeb64c30f33403e6a356def30ba6d64ddd187f2d7e3575",
  "199": "9e92ea99f0176bbcc585652a0890885c9e1e4e6cee90733c601c6bddbad3bb52",
  "200": "c11e56b64b22219bf338fe86f3cdc171d42aa239c33ebf4635bf97db3fae3ec0",
  "201": "850651b19131a92ed87a136b443cee7735507ca0bacb0723fa0411fd785b6027",
  "202": "3b9e43ce36a005ebb506b4af7343454d45b3f5684065a9e2f8eec268c7d7172b",
  "203": "0972e2c4cd9a4cd32c2cb8f7f6ae5be272b5d3d54fc7d567c6ae698ace68ae5a",
  "204": "3b15bb12040af26bb2650230d63209f3bc3a5c71e18d2b5b44da784b0f806ebd",
  "205": "80d0f84f0232dcbd888e5ebbbb85a081e0db5d64d3e47483047842de8bcf4676",
  "206": "8679e7ec9d655d8ad1dee599638194e38c88d3e42d385f659166ed2de6757cf1",
  "207": "1307c4732c3cd919d4addce0c13ac736cc1449449e4a0323cd227c63d333cada",
  "208": "e87e45ceee3d2be18c76bb301e5fe100e42c25046bbbee885047714f30cc78f7",
  "209": "2bdadf98887828278afcf6be0718ff26d4537947d0f931b97beebfe163621b55",
  "210": "17faf1e6820c9315333dd90c1fbd7098155e4d43424431cff1e5abdb10096b4b",
  "211": "5be2b731a68d3953a886cf7c916021455a8a0bf7b3fba6c6c7a947367e54e205",
  "212": "4d1dcc93fdb1adf050925ee5091b094ae69509cc49509f224e751f724f004a98",
  "213": "9c6909a1d5dd5bb42d3f8368887b78e10f9adccf4ae6a5012a76de82d4ecad81",
  "214": "0454b8105df0a23c5801bd673afa008556dabaec5b36f8e0bb000d4b7db6f807",
  "215": "271906d0935957336712a412d3f0fc66be105b55a91890bc8ca3b783f3936e26",
  "216": "4f0ce60998eb84437898c7092c640ddce4590c0fcae32bc0f17a3d7b2bd3ab5a",
  "217": "9cf8b29fdb3fbe1617d94930ed890bd0d9ec853ef6d99e72b30aca8151dde80b",
  "218": "617ed373b0bd8169ebeec3bdba276fca5b84e4a9cff972b265ad06a9590636e5",
  "219": "8936cc706c21a2eecf9eb0db4db904956fd2ed88a0676c20c6039b02bdff38e8",
  "220": "7148a3ca8dde8363c148682d18555856153c1b0a4de8dca1563191baf405147a",
  "221": "de3ade675ab37b0db91f3d2473948fd7ca0b978928d3842c7f56fe43410c08c9",
  "222": "8e163dfd87e24edecbaa19152cf6c2048b543fb2b021b9ca0502fa488c7d68f3",
  "223": "010962f28e26ce6527a3acc405610306f5f3235980177e634005444786f5a909",
  "224": "bdd2caf28b1e262f79a3776e68ca745dfd55b324ffdcb6270cd8c0ac19da97aa",
  "225": "d04470195a404f91fe955de8450da68cea5fc00af8adeb84033cfceeace41f67",
  "226": "0a6ed8ec35d7b2196a1a54c3f52f658e124e84907c94ad0a33e4e4d74fdcb461",
  "227": "720d5eef5e8a25bf19ee5318f3b01f01beed8cf7220c6320c125a66fbce46874",
  "228": "7b621a9f15daaf33814280a5d273b586bd098d6b0197151394fe9ff9464a4327",
  "229": "d5361f5b34cfe8be8b2241c4e554a916f67d8a9972c680a7f05e682793feb2a0",
  "230": "47403d9e9fe2b954f5fa425158e9e9d421c591227917a8e9aea05cacd2b4c143",
  "231": "178fa98f8f9905945aa59d41d15937fd48fb08f7b23341559fb43a1a6967f2ed",
  "232": "ccc669e38f69896fbb27d18aef99f2af043c5986d90092729f1c897051cf1a10",
  "233": "6eeacf42b2b5de0c2a3571ade6d58cebe33858b44059f13194f56b9eff248c3e",
  "234": "0d06029ceaa4899c239216b58aeed11e29a32f05c26c5dc090d14f3f014a3d8b",
  "235": "470639108cf288f8703fc5876cafb255ea7cda2585dcd2ae6498a44c3a553cd8",
  "236": "a007d4feaf518f8ff839ea691e9c66edb5f781e0cd5ee3c966472ab37e3590f0",
  "237": "d85a1ab535f20a354340777d731f325b6f53140ded95bdc6244a2259a69ad1e6",
  "238": "8e8ae4c61087f17a55e2047f8d4102ce27b5d48d8bfedab3ce56b12211c3b86b",
  "239": "81224dd1c16c5a78908f1e094e4fabc7be1a73dd907784f7ace3ecc46c7fa5b1",
  "240": "911252b6db728d4505382d2b031078cdcbd161acb8d4bc0b2cee0d9d895795a4",
  "241": "f3aa5ed99971d2a4c748b60925c75579c32402fa87e7eba50affa88a270d397f",
  "242": "f545c881f20bff1522c05bfe703c86e3c2270d2f2915cb9310091715b9e51770",
  "243": "a7ce5fd732c12f67d806c8fa29718468fbb668e97f02b1f06b22d2820c9229f7",
  "244": "6696385eb99f704b12de4a4315f29dade898ba9fec05cc259c4b2e9c949c392c",
  "245": "bafa4db47e1a068a55dd2047bce89b34934ee1a4af54b241cda6adfd0ea58726",
  "246": "f44f31ce7ece7ae1e618da094edb9434e5e26eb563ca3d864edf3bc32b04ebb5",
  "247": "c722e7ff26d02f195cca0dd82ae87f52f80e05d68c035b8aba4c1abb0cadb2e0",
  "248": "75457a9b8be38084dcf272f9d52108bf0e16e32dc97559f832a0847100cd8604",
  "249": "e094827d24b1f766b1066766f08d7c279cfa567c61ff0ba962e2291c1f4c6f3f",
  "250": "4550d29a247f33e9e8bbef4eca2ed4422033f729337339c27b9c2970a0557249",
  "251": "9990266664dbaf50776c6c08c1cfc7d12dd711df4fa8c811a585cd91f5d364a3",
  "252": "b9f60cf738f04f693e90901ee5e53b331571599ef1c1b7de4fe52683408bb8bf",
  "253": "15afbab950cee244ddb63a23e2b5882e6e02c387d0606a0cf644406593c677a8",
  "254": "b76f67fff87bd33e5d7a593000560bcaf363bf96506e527e551b75a7b8d2c9e1",
  "255": "b0a1234dba66edef89c0f7328bb177ce71b2cd543b49b7c45c23378370d40e08",
  "256": "53533f710884adedca0344f8a6ceb6842e5d09c4bd3d6513b53922fcbbb1ed9f",
  "257": "8c8ce2f0fc6421b226b882cfdf12eba4f05112a93966bf1697bfa31b13470a25",
  "258": "e61d503b4355ea43050bfcf30c40cea9cbe76e1d3daad864caa54d81b36fe677",
  "259": "12c5c4b6d3d78e217f21c7efcbcc20c6c6e1219f2d3fd22a34f725e284238f28",
  "260": "8d93859fb437a0cac8dda051a344a41ce590681589d3af2cb836686395b06c72",
  "261": "49e13e3b71830d55c29f1ab34c55a6bbdeed60568086d958fce0ea67528ad776",
  "262": "ddd6654b5b413b729f45c8b7f14e04a955174421f4d9dad5ede2ca91992477cc",
  "263": "131eb15ed36975b181d883347a5592f1e4bd8f6d6990a91c553d9a6d76c50d5e",
  "264": "f8508bf04552f711138554e4798badc63ebfdd874c4758b6bac657867690af2e",
  "265": "832e0a0af472a321aad94b623e6183734d2373655d868009a879002ae4cf80c8",
  "266": "1c3e898c24787e47da4445a2fc2a769b966d12b3f210fa197a8a50e952a01b99",
  "267": "37358c49905d8cb5fd399e27460647fc09b71cd066462a4b8f26d532f27f8a9a",
  "268": "f3c5cef33e2bcbe802943119fa12b16235424e2f07b0626c3b20bfdaa7989467",
  "269": "f30b21eb3012593d36b45da791f9a3070ebc27fcf24df935da8e2e6c0fef5986",
  "270": "10433074af38fd54ce633f312049bcbefa11e2dd1d4b3110c56dc74e56b5d73a",
  "271": "e3a56897ffde1c0e68faa41bde6e5ec9a3d5dceee1b0f61b8f7bce2a88561e55",
  "272": "a98148121e682a5a6ba3704e24158c31dcf8757f2ae85a673be7f88da42fd0ee",
  "273": "580308bbadffc7592e050e87c784d94573dae190ea34dc31bef2e23d8166b8ff",
  "274": "54d0b413931843bb5ee8cc45604acf0876323ebfbf2426541a2d18e73a01701d",
  "275": "8c7a925c7b4a16c30bc3d1d90e190160b072ab28daba434bddc2d3d449233289",
  "276": "e5a7e31f0ecddfa67b7df11e2e6ad50c5fa8bb9e02127128d33397912a1dbf9d",
  "277": "ce51881afd0792d5f5acf570b13c18359d44d4960f7f3d6e8989740f75f05871",
  "278": "57ea8d8df29190fecddfc1a5d16c5d3cd3bf91d0ff5b4a2d1fa69fbb1a4c9d8f",
  "279": "4d51b89f764d62956fe974bca2a27b738544f6f22e8f4a5b17925b6c806cdb54",
  "280": "1ef0aeb72aec76bda567d870f333fbfd4445f76cf0030311d06aca303fb3f207",
  "281": "db806f04bbc0ea95a029497edb20452274912f7f4f2d234943e6855d2d721ce0",
  "282": "4bf59c60dd35be8cdd369ac190172a1309da0ec1e291fc2467c0769cfaf7f57c",
  "283": "bef3b9a8d9e7535430096e1ed1bc57c5f6c3d32a113fdd910f4d40c31ade8504",
  "284": "befca9b1bcf4b8e42a8ed6236fb269e870b383093189b4a4d1c3da0d2afe677c",
  "285": "79990ad603ad89f1a3a7864d295843ba32316455c507360af4217799c3552144",
  "286": "d2fff381143900df3d37f3f4b2ff81cd86f326d72a87fa070d654865fe5aea82",
  "287": "bcfef6a40520901d0486d6b02dcbef3fc4ef1f3b79272255886ab4b3ead6830c",
  "288": "f4aa0f4e946403277bbe9ced16e7011293e4c1be2183a50f5b0afad2d8d6d19d",
  "289": "6025e4570ed5b31e30c3bbb7e04c1a5d4ab28a09da951bb0d483528346a2ed43",
  "290": "db518e5ac019c4b4955c629373c9a90ad18d0f8a815173d94b6f49e3d237444d",
  "291": "d42c8dd183a71ec1ee5bde50cd98743e76940edad40621a99ae884714f9d68bd",
  "292": "01d186fc32664a42a408e56883a8dbda8b6343552f527b4be493a68defb5896c",
  "293": "79624773e7b648ba5b24f42b68066566282e28560a1bea9f9dff85f8640ef0ae",
  "294": "b046baa02241f764fce88034c1ca460f70371dc862f2308dc8e8026150f63872",
  "295": "c01c2df489f5bbfbdef278f162895f9c20e1f11f494f7633a756da4198cbca35",
  "296": "5f4d103a64c03c746cc17c65add55c8f7dbad05ec5939c69f001791cafe7f9a3",
  "297": "b9e9e14067e9ce1b209be9b22717546d3d1696b8940f67cc0c3695401a897772",
  "298": "4d65e7f823ec9433ef86003f61d815de0eddc069cbfed1f29082dcbae8068009",
  "299": "97297c1362a3cf3610434ff9e2a7ffdb9bceec2f59a5af931d326c28e9297b6e",
  "300": "231cbdfc8eee6083fd6b6d5c090e4f44580150a870bbb3d45d6bbcbd0306ad7f",
  "301": "7cbf24c45d227adc446b9cd2866f555388bec7cf03b4075b8b020626bedee14c",
  "302": "fae89082f839eb2001925915d041445ee2c99cb17325849689694f4dac8e8863",
  "303": "28e170c60d921779a67ae403913a7e01b41540addc01bcd5ecff86fb8d995914",
  "304": "3f62464021249aa15cd80233b15fcfc37126cb3f46b371a1c544d72f30a2c58f",
  "305": "ddf325405355e01d5476fd3465a51a4335a594ba8e90556742e033fa21d1ff3e",
  "306": "8ea5ac678a660c942e17c9f791f00ac2bc26b68478ae671b0c0c940a5372d9de",
  "307": "8dc75d550d58dafc98b96cd539347ff01b2f1f6cf1efd6b09a37d67aa874b2f9",
  "308": "1bab63072d9e567c1dc833e36fb2a32d027b120542b1c9ea101b859336edbac7",
  "309": "60b621dec976e0957ee9f675b11674d37f80539a6972c7a43a832d59090e9f0b",
  "310": "cc7d5991d14a4826c4ddb65800dd39d352095fd15d689077abb491a8af9031b0",
  "311": "8088962dcea862c7702bf8359d84d5a7b2134d0ad5bc46bed3aca2b1749c846d",
  "312": "7299e5b38d620e01f8fdc58ac7482252ad6dd65f84dd9d037e4ad8b09ce7ab0e",
  "313": "170b18f1b7c4279ae6ac483ca69c4d897a0bbd1438acdda165e99509f020faed",
  "314": "855cc53835e41ea3b95ac84d70f6a449388544b37ae806142ef2cba3e15c82e9",
  "315": "a15f95e5bd73960f067436aeca65c186d76a7369f09556221b2e7449be3b48df",
  "316": "88371aa80741ed29edaaf0bc722036cb1c4750c6cedf06dbcf5034609d03b60c",
  "317": "d03d62b6217c4e88680fdf4b577b0dfeb132363259709c54b547d6fe54e251d6",
  "318": "74a0c11853cb863161c5dfb5164615fff3972ad7e48117dda89ecaa005f2f5df",
  "319": "45d387aa6e8cfc9914dd1fbfcb7a5dbfe8784626cf0b38483d620ba73ce0427d",
  "320": "5e5c8736ae15093efc14d862d3289dda72ec9c923187a9c056dfea65ba7bac2f",
  "321": "8db949b3706ade9152a884ba8c077b4f61b075b5dbfbc8dff15b0324587b3fd4",
  "322": "6b060141caaa3c6d21fc05e8d4c57d50a261a206d246a5618ea0b94eec79d5fb",
  "323": "a0b5e7718fb1af44d1935b86167bf53528e2d53339102dc06666d147fdcf5516",
  "324": "53ed6536bc7450906b23bfa91b8e19773039a5c4fa02e03eb1e5e1ba5c977475",
  "325": "3839d966d7ce855e7ff7605850de2e9aed69989099bd43572e1f659c1c956e4f",
  "326": "d70d48c1d92bb6b08a084424e9dd25e66199e638ebceb596b1fb4154ed4404a4",
  "327": "84e15dde66508d10ecbad0d86c0428125d726e61871a7131ed6417c566255c8c",
  "328": "e57efea3735bafbf2634c9ba6848f3dfbab8adac123e110e5e8e219acff0a13e",
  "329": "84331e8cb0c7c0868838c2be6ad204f79ec6700c66a4d77e664e72bda00b93a3",
  "330": "818aa6511066a975946e7a273d9d8347ecad710f98c18a4de50bd777788f08d5",
  "331": "1d3f365221ff53d384b19e47ee3149b2a59462678b94f9b13c7924825df2761e",
  "332": "fdf613bdcf0a8cfa54074fd606ae1f3a2fb4a57e63975050102a8a8e0431a01d",
  "333": "2e315b6f177c6e5c3d414c9ca2a147d9ff5e0a853a57a4a6667e331fb37fb9d0",
  "334": "a0376b5187b8833462e704dfcc68882428277a8c1ea753bc997afbb98f12bb89",
  "335": "6d974b71bed199a29a11dd6ca24424dccf75ba952ba24489546250c0aa2e5c12",
  "336": "ffa573e65d0998d547a9af8af21703551ffc15afbd5630dc8ed2131874170236",
  "337": "24887310ab4a843024721a5682254c1c4f255ccde736802b33c1aaa9c70ae45c",
  "338": "cd618e755e283ba47b15e75d1312962bd16b0cf19d89f691bd1680d280268ca7",
  "339": "d154aabc4cfbf1aa5523faabc8760945d583996940f4def557d9c2d077e9803d",
  "340": "34d04e7357a752c38d6b9356b5f5d2d873a2cf38aec12e615e001e635c211055",
  "341": "c7d808967933b61ddacb1d926e1223d6f0b22a450f8d311fa2ca333afee31e02",
  "342": "4a9e239de8cbc66858dd0ae5bd07b81fc9f5b2539642599275f770be123419d5",
  "343": "8ae5825afd27e5c0781383ac9621c10f1f74356bae22e3fb1ad70d8f4d1c5db7",
  "344": "bba38609b50e677f457c54ed025259191c68bceef977fd8ad6021956e328c6a6",
  "345": "1139beebabbee28efe28accd9521e326f95c974b506062d0a9fb19f3bc82971c",
  "346": "5304b2f993da73d87248c123e19c3774d725ccc0116f5eeb699580bb16b081c0",
  "347": "0b7c5650e0343d1c6b4debb6a3a5f93687d93095db2ab17c3a48533fa5f63e16",
  "348": "c5563c79a96a3054e0fd312d2fbe5d3d847d1f606c16cc45d8688947b8945761",
  "349": "349d7119cdd0567c8f28166b2e2e652ca66a41160b7db757f153f696d7e22eff",
  "350": "854fc3aef1456a9e5c009a9b71f7f1a4628b92ff29ba0e4f4cdb65e2e9128000",
  "351": "42b4e58a20df645da8b446b17de94e38e84d1f47c21d5c39f0dcaddcb8bc9df4",
  "352": "b6522a9226a9a31b5ac447b5e4c36a27611516dbd3e0e9d38a6102b8a9e87a02",
  "353": "f799ca2c8890b829c98ae52ed48964ee65bfdabbd6c027ebe212cd00e8321b32",
  "354": "3e679950507ed8d30dee7c5f225b4b8dccc8bd1b17d3a54309c8c8355cf41413",
  "355": "869afb6123a2a9345aed3a5d63ea6c8000286907aff1b33e341d799029e0ab3a",
  "356": "b7ac98d676848e713addaa2232acc1d2bdc9525e039d0b2a135e8d37729fc756",
  "357": "878d8a3e45cc639f69053b4d55d0667d56839e88b34ba421691d3f1749f9ba67",
  "358": "4cfada34ff2d826909445e57f9c530ba292cc0af471bc07d0574932b38752d1c",
  "359": "33eb781d497ff57e636ff7b9ffa92aa43dce1676642d28309b2c8f84ebd6d4fe",
  "360": "864926d548608f662c0a8d8f385bd054f36e859c97b419608371806a63df7c2f",
  "361": "073a1b2a188154d411f9a5a21ae0ff2287c067e2b35fda0add43f07208c210dc",
  "362": "cf1af5ed3279fee6bf530a1cafb7e6bf30c024287644ba960715500d7df00155",
  "363": "e7c68904297edfbaa5960c7718b33c02b101097c4f58dac1b9292bfe8e6c4401",
  "364": "c80d54ee82819eadd3b6b949bcf79f157c30da8f19f54294214e7b45b15c5016",
  "365": "933815f5885d3355c52b0b9470d27a4e6f70e564d099806b3c2592a231660b32",
  "366": "496c0224f875da320c74247770812cedbde1731e36032fb25167715a64524085",
  "367": "0db5300a812b908de3fbc411f64435e5f6441ae79092194f1c07c893610b62e0",
  "368": "88bfdc57670d2e8014b5345ee7e2cca52850c43e1ca2d4428a7f9161a2644f40",
  "369": "c35d37998daf1605556a0d6d24bf75199c93d7d1b55a1edb73dd5f630ab9eea0",
  "370": "e91a318d48e082b5065d56c940db5981a093f2b11e5887aaf611da6a76525647",
  "371": "4e705abf1fba96439d5848ef60b45268c8bce38439ccd3a5ee04db925941b47a",
  "372": "6e16565abdc3aba774157af8abed0b75c6a72a84fd466c7b5cbfc8ff530076cd",
  "373": "acdbe1715affa9bfa1b9420cb41a38324332be57e637c4880a441fa74e78e1b9",
  "374": "0890024432f8890ff66fb17bea32b2ce4924149eda895dbdd2cdd78185eb5755",
  "375": "65bb4b5b6b4552d71fb5a7379e0daa799e6db95e528104b65c16ca682725c01a",
  "376": "e8b73b4188ead4c883030a5d39cef6b90b0db8ab86ce685908067f5451152be9",
  "377": "6ee3bfe5874bc71155df803a4865e4ba5a312aa780d32898c1135514257103ad",
  "378": "ff46dcf40300776ed76eb1f4bb300b0f4105c1195b9943e713c22d23983de466",
  "379": "fcf3e20ecb1f48fdb1a24c7b6cdb1bfa614683b468d4a4bbd0c903cab1d5841b",
  "380": "42d6db767b27ac39dac813e23438e60c2c70f391eecbdf65f2839997523c2f34",
  "381": "2f3203c6c972d0255209eae79084153de733c72b18a66bbf514c410e0b676a2b",
  "382": "59b861578c7c8823175ff435444ced542a4fbf624ff1f6280a8b36082f2e7b1e",
  "383": "d2b03163478736fe04f342b2cd3359dd35d6133e063b0d37b5b5f666c4359e62",
  "384": "e9ad11abf7ff8fef75b633735a845270a737c0adcba252d49a1ca539485cf358",
  "385": "4b84048de8d546a5564cda7fd87368f61efe025e70969cd81a4cf5698dc4eb00",
  "386": "326ab1c4fa159663302f0a12557dbd384290068ff42196728102b496663d1f5e",
  "387": "fa59aae600cc9d67512325b05faa6e987f85ba5974a6d42d9425fc8b3ef56fb5",
  "388": "ca701efc012eedf694372d76307a22d3abe944ad88b8289c75cb066ce3e1ba2d",
  "389": "e7a313aa8fc56b426cb9e303aa67110cbbff24339584ed794185a1b5a57c6894",
  "390": "b0fc51a82ae1ba1e8737874e4dbb2160de28686861a6abdb2b1c85b9bade55b3",
  "391": "da2e432765d77c51afb5101c02ab5da375c23c22d4041d4a4c19d1012bdbf218",
  "392": "4f21c004ab89c25d14e37c5d282cb07b61c5cd61e060dde6fa331a37ef968cb5",
  "393": "d05108d33d374091c8dd2612c6a30477da06ff567e8afe76580296e7ac13e4b2",
  "394": "c1959688e409da13d372c3cc85d21162aa263fb7b1b88c40f75dfa1996f76c4f",
  "395": "3d20e4a7d97bfb941fbee885e9363de7817b36881220531d05c14b7c91d4c33d",
  "396": "f84dbb22bbf2ae59ea14221de0d15d7b0bfb0801bfe3f015482962755d0f6f94",
  "397": "a44326c7e768b4291aebafd1c1f0003e1e71aa70bf1daf8bf629dba58ceba879",
  "398": "d8c44e4473c44e844d398324cc397e69f9b6ba1884f1d9c21d033f1a862afcae",
  "399": "13e90beea867eae430f0304acb07c5766c78148ba6c1f1a1fd7f6074a2317fb7",
  "400": "d9e01b90e1cfb9d0c5c72fbe7929f54c57ac030ff47c36e6b2f977dc72e300b0",
  "401": "7f8dfd25523c0c5810847fc38c5bc42a91f604ba1344d6e596cc6e5c7c6ca83a",
  "402": "862af54ea619572a682ecfd472252cdb5773e8321b2c0abda1c7800e9a024a5f",
  "403": "2294d7c0b3d9bebf6d4bf71581b66b6b0e6054cb43ba2a5c163694e702efc188",
  "404": "257105a72af3a33875cd33678d0a6a16d2f435e761156f9fb62528cbeb085fa2",
  "405": "7fbb3a7867cc2208986af59902f89545405251bf4ddcc989267a2816fa211f67",
  "406": "4f7e3c1117aaf7048b5e767cf9442e6effaca2d13ef3e28732f4e7b3f0559bca",
  "407": "d96fd4790287f3476f1f45a0bf64286253f1f2a12aed85f8c2566c6f9e7e910f",
  "408": "741dc1377163cb19044d9f585fd1816c421be7413c5dfaf6203740afb348e165",
  "409": "59c41fdfbdd1f52c8870b6a740ea64dd0b10c09f6ed06b5623462e484e92a9ee",
  "410": "32018d454cee52c764714a7416878ba088d12a717ff937129f86e6108341854e",
  "411": "8286dd6fb9012c3ee7967f6c25fd39579088c09ac81ba7eefda645b6fe1c77c2",
  "412": "33f237130bbbbf4a9d09d3502a86c110decde9be82ef8c3d4690c8a5e4780659",
  "413": "1605d5481306fc3d8a67f52f863357a6ce6b6e57acbc5601c221d77b1dac4210",
  "414": "1a6efee470828c0e4a8d7f2ccf3fa46a59d2d81f91b9401b5b30e93bb0c351f2",
  "415": "333cb6f5b3689cb29d1ad1426bdd79e6752882ff77b13a004b9688665c3cfbda",
  "416": "49486396a0dd12be6cec62a46be5ca9883d7a81348ea0bc8c45cbf67e3f93374",
  "417": "e4fda2e09ad3c75d94b8ba5522b1185f4b7557975535b1170d0e4cc671ef240f",
  "418": "8a8fe2e8b2949f6019e1b13b100f0c2f42d862deaf07f729ef9d1478f946f5d3",
  "419": "b124126d546ed559306926dbe9a560b999fbfde40153ee2732f57fa796e4a694",
  "420": "9144f87f8a4bc9735c6ab75459c31d9478179af22b9cb3db3a772bb8cb4edc54",
  "421": "92cc7c3f66e7ffa1fddb6836368de8688a1bf9dc5cf32b3833feeb47c6e5f12e",
  "422": "0e52b2575fc5fb81c5326ebabc6756097f87b3418f8255ee5cab13a0f4bab4d1",
  "423": "3c45390324e36bf4678c01dc17c1dc89cbf7a2d12b0a96d804d350e2ee8e58fa",
  "424": "0b38a62e6d1038d319772dac4a628aa4ab26e37459ccfe6c69530df498f51879",
  "425": "a91cd1a97425e3edab62af2bc49708fc8ba8342f29c4346ba2fa2b99efc42c72",
  "426": "cbbff78a47b9cf71ae11f7ce9b14ca2284a2e55fe9e6f28fdcfb60851a9edc89",
  "427": "1fcda737885936b8f4dd5df83e467a30fc5d4fee169e4e4600e29d1826da26d6",
  "428": "27ef86a262888ec70c788db11675525082aec2faf4fcc543457c2ec105ad533e",
  "429": "30cf9415699906845b2df056c5e1e706807d35e3bebbfe59b8b87f5d43686955",
  "430": "bbe706b289d52c81c2b8feb4d70f09714625dc2bda79a79a5e31ce9fc26c8159",
  "431": "32a5d75b4c1c0b6c8d964e00ca950dada4018946d6823fd9bcc818db4df2461b",
  "432": "72a0da1ae5b9bc3650f3edccc0608817b84141dde516ba02b8c2cfff5d3f15d3",
  "433": "5d2209468344a17780391cf6391513a2eaf237bfe12e450b04f7fa4fce0b5764",
  "434": "ff9df6cf9c10e8ea8e0b06933d4044b7f43ade91a644d0ba49461bc75549202a",
  "435": "3795c2e8f8e6c78a77cc952152c4c131d7d1cfa762e49545fb31b692bc4a5b52",
  "436": "539c400a7c2dac73d1ab9ff485cb61cddb787f97a4dd5201e43a45a9463892f7",
  "437": "10c19e1044792927168f9b7b70d2ea70a68f64646690616342b1fff1920d810a",
  "438": "af976cc02ac8d47d0ad47147ae261098c028c890ff4ad5200bf4677c17df728c",
  "439": "ffaa219012acc26d1fbe4e603c5d85468d18d7432516c76dc4609268b0a24dc7",
  "440": "7ab7235d73168e47559bf987f8d3a077cb6edadbcd32b45312f5dadb7ab39704",
  "441": "7adf43684d7a7027e30e56266a079f69046db5f3ed0d6c413c4c7913c41698ba",
  "442": "73663b2021b7f605d1cc6e20d59ffef2d8d6a5cdc9053d9ab0360b6b7d86e7bc",
  "443": "bf4791d7c95f449de478234e06e9a4e69827e9e02063963ae4e93a5007189a89",
  "444": "699e2072e86cb0ffa07099a07d7fa4a030e8775e7cce364fd33b64f54082e3d9",
  "445": "fc5b9efb6d43c34fa5cbfe30e0fbc5b1c9f587ca8a4acdde5a7081c3155cf5dd",
  "446": "7cec82d6fc850708f0fa1fdfa7952e202d7d498e3ae02168d245d25ea541ab6d",
  "447": "28a09fa56c471adc72e10f866bb4ffbff66a49423ef07a0585aef8c401127c65",
  "448": "ea96864cf8cc5072771e0e4695b71175878ba1749a0fdd9bd05507c7e0d4b5ef",
  "449": "8f74dfc0c8b66787005f7d6abf122a65f3f23cffd7dd375c827da7901f906409",
  "450": "d65cfa6d719acf4ad4e5c53905df8a29c40785a711947628d6e7a31c9be031a7",
  "451": "ee9fe1d5feb004d2b803baf17c545211101bad794b68fe09cec8c6affccc504a",
  "452": "ebc23623941497a55bd2e1c53f8103e0101c9c499018e400d38c997c021735d3",
  "453": "c018b884117eea23a442501e7a91c375053918059c77a4d696a130648e531f06",
  "454": "3250cba195a9d0e8112f0f3caea15d475dd79318fe9305c03275320b3e6786cc",
  "455": "10ac6f51aec8a5b220578956616a5af37a219dd3b5ff2bd1126c8a72c5becbd0",
  "456": "09f52543dd81031dab976f939eceaf6f40d217fd613f8bf172a94e9675081ff2",
  "457": "1df18f5234a64124f3deb69da6546f4c5c9a23a75544f9b0ca62be8d21d2de74",
  "458": "51f9027caffbf3670c22c773983ba0e874b921a67dcdee0112f230c03cfb228a",
  "459": "17f5b167bf47432b55703c1d82d91ef837179ab8a2d5f8ae4cbd0c2d29b887d2",
  "460": "f3e2ee74f6e878c052ccc022fc8ec36c504763c8d36405112ca60ce69f41c3d8",
  "461": "69248bbff21b17e6630572c6da5306dd68e046eff9d546b004129fee12182462",
  "462": "d3a3d7c7d00566c147244d99a9c9ca38af5c0b816366e1dbfa3b68c89d0e4a60",
  "463": "18560ea39f510514927c6944299d902bc7e377e991d6aa6e61bc52a396825e1c",
  "464": "7c4c731248ad348476f37624718d021e80e0d217e5c4c16ccb59f11052baf718",
  "465": "ee13207dd93215327a0c569ef1db7b2ec941b3b13ef11da117f77abfa7b0c2d7",
  "466": "53b8204e6331cfd7c249998d6617423af32ce7ae45877bd5dd6e784dd4bc9182",
  "467": "c3c1df0b5addd638a363aebdaf3e7ef1e9e9ff306271b0852a9a5516f73f5ed3",
  "468": "4c34738ff826a4c2d52919fe1965e8ab185645e479db6b0bc16397aae0bae5d7",
  "469": "54bf7fa876ec19305729484f7c46ced5e70c25af385c29fb798e46756b6c83ea",
  "470": "739e30246c6653c9a508d8894046d48c65f3ae0221fecdd575892bc8f4af4595",
  "471": "26c576485f13bb9abba2715f0ec6d2a43ee01af366990ab5cb26ba85cae8dba1",
  "472": "8fecb7e28431a86edf64132749dc7638b4c017eea4377de26f82c52553439702",
  "473": "a3ecf49a4f29b35fb0df75cfd32c8ef33cdeff15fa8c9f62af3215d30ca7685a",
  "474": "9d56dde9f212c62f6a28d068ccdf48f22c4678d94952b4f185682477f67d4878",
  "475": "f2edc040631b3bafbf1bb4c7ee1f30332b7c07bfb760ca0920e7aeaace62fec4",
  "476": "e3a91d9be9637595e79e5afb9d964a280149a0bc201fce1d4c96154acffd79a5",
  "477": "ae843c2dfd2b22f203be52b61f54dd33ce45f4109647f57134fe7cde8551b50a",
  "478": "ce6fdcfa766f4a96193be5df5b17ff27253385fccb06f5677bb980b4ea682676",
  "479": "53379cb9bf957b3cc9c513cddd036d851641051d9f6116af8af4c10c20e171d5",
  "480": "9e2c4690d76ee9a364a6957767e81ea5d00e9dd8392883357a55f49598c67bcf",
  "481": "8862b09cd36f857505615318bdbe74ed1f63f824a01ecb4e381fe7e97b3817a6",
  "482": "787a2a1c301e23d2bab882cbc676a0d0967c66ec534827d5959563c4e70bed72",
  "483": "ccb571cffc881a849d1daa471724bd4babc86b30f81cfc3dd5de4597b69c3a49",
  "484": "f6ae120949dee77767469b6c4b0587a43ef76ae63e2445430d140a61d2cc51ac",
  "485": "bf4fcfaaa2565e0a0918954ceb1116bf6902eb284fa921105961cc59b206fe16",
  "486": "c591bfbfd6e3a1738005ce61e3aaaa2d7408f3915785238edc1c11a7cd15d1d5",
  "487": "fdde8fb922fba3df6cf79b0aac642c597b2e19be5962f6ccf0e5d6c64abc9a63",
  "488": "f2f337e2ac71fd2290e24e1d55931bb338ce862e427bf51dbdce1ed4fc6841e7",
  "489": "a203064143d5a39f5a37750b5b27f3eda68ee1a4e62376c559729fa4f060c113",
  "490": "4347595fcc86e8f14571756b114e293758d82ea013aed80ca71b2d7b1d1aa657",
  "491": "04a4b1b7ff79d07844d42e306cea82aabb7f3f3a583f280c785f66d5e50978a8",
  "492": "73a91e0ddf9d2aa1a37f7496cd84bf70575f58648c6ad2f205616ffca2a4e03d",
  "493": "1115ef2de1bd8effc7efbb9f6e48ded69dd8a9380178f102d1fdf058a04bdb6c",
  "494": "25e967d859afef0a1fb6309a8ab28b2bcdeb08aa1d1d9110809b0481222533b8",
  "495": "d61fb7452e9f48d3156125d283873777ab071ceb2f40331bed1a319bcc6eabd0",
  "496": "b20f73a64900cf78151974260d92531ffc2482fe54d7c2362b102e5bfdab3eed",
  "497": "4c1ef53705101c72f3486fbee45f16420d4aafe894e8e87eb1ad2ed94a6e18a4",
  "498": "d227a5cc3c219e46bb3a7c0ee05451228735243c675f1b836207c9bfddd50f37",
  "499": "aff2cdfdce7c6956f2cd07319b97daad7b837655bbbf20d1261e9fe4486e20e7",
  "500": "89e7701aecf3f702c45d4b544c9b47ad480cb8a51c196115f43f842e9083a50f",
  "501": "c70d0137dff9c5a9367040dfe99fc312e97c17eebd772729fd4c46e72b5f8fbc",
  "502": "b78a13704f629c56681b958a7d63834013b29b28115bd0bbb29c6b4886c75339",
  "503": "81e798e742067d98a8eb727b6997b4cf377a39b26910ef09e0d5b5637ed3f83d",
  "504": "fcdb1938f3fb1cb45de96cad99a51c7111d9b54f657177d421068ae9002b7a50",
  "505": "61e2134aec0268511aff88b5086f0351a6d9f2ef3238eb2881225cbcc2a5f6c2",
  "506": "4f2e6185dab5b87498046af5eb6b6db269b46da624853596f96866c76e6506b6",
  "507": "5b850de2c89d168873d167809cc5d56d8d77e148eee56b14c1c7faf2d1daddfe",
  "508": "32e4c03ac08946564fdce972bd5cfdebaefb9e605c45fec3ce398236c6d2c9d0",
  "509": "afd89eaa0589cbcff342c3d4f60379edddda6dc270adceaf2aaa609b93a2f4a0",
  "510": "83b9d390cedc9fc457622befc58f89c283972b77d7734c8dd99321acef257d41",
  "511": "56283263e706346340ec1b294bbd160d62a130013054e3495ee192ca34eb103e",
  "512": "96d45530ad83506458244713ab96e206411925d26e4ce79f6c5f9ca80ccd73e8",
  "513": "4453dce01b05578e2d1695ee2eb00d06e5d1a42848edd36c48237bfb121c9c0c",
  "514": "10d8c2b5e8fad1fa4f9e4e0723e43714c17e1def47923033e38655e6af1fe113",
  "515": "091b7e1642ed05be3231fd91218e0d3e5faa079e087afb087b0cdd9f20b64a96",
  "516": "660ba6773b7d9a6d2c37aa599cc41e72346750088561e023629a12c7a80f92a1",
  "517": "1355c36a06f18778cb20b89cb8365913912fdf94fedcd6e0aa0b2f464c70e409",
  "518": "c219fc6283227bc1a6d4366016a980b7590ab85ae62d8f4d83f8630bf974845c",
  "519": "e8fac8fe4a80bdd03da55f0cf2eeeba45fd69beb63c11cdb8caaa1ec98ea7755",
  "520": "1676a9ec0ec01a05b8ba0cdd0863d2f81704cc2efd2582f6426b86950cb73d1a",
  "521": "eeab6f5878254b5e9cfb80a8b31afe0848a9cdea20f07d1575fe8cd274b843a1",
  "522": "e0506972a26046a7e49cb5e0d8d82d1d144d21beb12f393859589e0846eb6f60",
  "523": "ec4f248a8ac8a82104c64d5d9fa36f0ecc2a9fd905354e7b8736de087f31d3db",
  "524": "54130b8197c71966f6605d3adb4a353402d5f743af4208b37acc8a21c024e5d7",
  "525": "efd4a610fa0de1615bf8e344ff54697cdf2d7120e8ca95abb5a95014af5c073c",
  "526": "ba8057696d9bf5704abb611faeee56489f7cb0383ead78f978182e627670fe57",
  "527": "98707bba5ef1e2a656633d10176a957c8b9564ac1cdd7ca886b31aa7c3a7025d",
  "528": "21bd7924d7e716b3d104629174acb5978b537a1ef7b792c142b0a66af89e3ce6",
  "529": "0b872e519fa62dfa809bb7a68dc7927122ea03889fa49ee539fa857c4d209f87",
  "530": "657fc8c92a0369038144895860c8e4f76980b83707b4e892981015c665dc7be3",
  "531": "fd9f8f7eda3649221e6f2e1a74c21d8080aee4ec221eaebefe7ef9f76789dfbb",
  "532": "40dff22876046cdbfe42c8b9c43b4607e7629f45f0f66281d6aaa771c17198e4",
  "533": "5b17c82deadf7b305772756c49f88c9c80058012d709e2a3057f89dece6aebc1",
  "534": "54b96540dd4b26225574185f32ed2c32f528c81db22e863913e78f5be62edd17",
  "535": "215aea66a49d6400d2250c5e7ee2406d2c80beb3adf2174764053616750d742f",
  "536": "cb5f625f2e4430afeaeb7cfd59eebf6f55abb19aa6a150528f4190c4b1bed984",
  "537": "ee6531744423d8baa710b9814787def41683c9660b0f50ada965ca38e4915ddd",
  "538": "cc327dbdb9cc91abbeccf1b102b4dfd2cfc38937c78cd7a35bc4154ba512727b",
  "539": "0e2d58792dc0788fd47c91860d5bc3e470e7d0ad700a6e365a8c723c82e914e1",
  "540": "1bc03098b5abeca6ee83526ca07b71e880f85678b89679e138f0aa600ca18047",
  "541": "df0b5cf31a95bc5d1646696421dfd82c66d87fcd7db86ba9d935d6a5ff4f7dfa",
  "542": "eea073074a8d3cae989dbe4cc7d4c4bb4d82d46a8056a707bcacd2f16f8bf73a",
  "543": "075913e9e5e86472daf8e9be4c3480c532b42f77a9e1e0bca2761b48883c5081",
  "544": "915311798a05fde7518d3b2b7ca097e89cd3f336d732702a0bffce96252f832f",
  "545": "0e7e768273000a5465a84b08b0765a408fc87afeb1cb86f4d8cdb1d17ea548d2",
  "546": "ad60fd181dd53969298773e64c9cd5d07bf8d66ee16e0e702c7ab524965a7a64",
  "547": "05b2bacb60a3c9c9649181baea8962f1c3c557bbf01eb51ca1ec4d8832a70e16",
  "548": "c179e116b73a5fe1755e8a3eae7720ad7f43c18bcd37afef055a0ad0f74b60a5",
  "549": "a5d25c8172253c12f48d44672067baf2b70863f56ba4b22e92980c9d163d3d8f",
  "550": "c8fcafffb9f44adf98bbb691fbaaa0beb675deff43813b75308984ea0c709f53",
  "551": "1ec0cb4869a59df228502c27d00d488ff6e1b3f56db44cc68eb09ed6126af101",
  "552": "9fc0285ddaed02c85875111469c9285c4fc67c860bd45baaa9446871ee6bfbe0",
  "553": "e63f8e2fdfeb1d97e57a2a88b53348e4d36e7cc18aef78e048ffc674d7f38aad",
  "554": "3e7965b0492f2501caa218a5c4dcf87b58b67e68063142a916d229a36241c509",
  "555": "f9491a67360d6afe012d610092ea37b45435981044c300dfa244e78caf88fbf4",
  "556": "6006c32af62764f9add2b22a077c29a715961c0fdc9eee7a95ff4be2653a6fdc",
  "557": "934306d085cfb7f68adb0bac550c7412230277d9a393b4c68668d1dfe8197fc2",
  "558": "3ef1ea765da3b67a4caca959bdaff3e8347edb71de6f8bb71e57117d307b3bdf",
  "559": "13e4a698eb93d4c806d2cd85bbbed084e3849ba66d18d77a38bb4848e34d8468",
  "560": "825daa6e1058ab104620ab90d885eeedbbf654ff770fc2357a8fcd4084724652",
  "561": "8cb6d701c82f094db65a11d26b31431fa459980dbd962f020bacd0d2ab8a0e60",
  "562": "cc39b292ff0c9602f2702c4c09f4d6eb2454852cfb3f72b74a0df1336bd3bed6",
  "563": "74e73c26dfe89d494e00bbfdf93afa43a53e3a1a39acd4a79fae9f946c3e4085",
  "564": "e357a937208aeb83dcb51dc226a9ace084aabc25bb22dfc0316d01caae3928b2",
  "565": "266f02ace3476dd08bd9c53ddb1c894e59e736d842b3e8785a679d3710ba87c8",
  "566": "127bd5631833ddcd4baea056c36a66028f0c9a877a6844c8cb0e0cf164ee81c7",
  "567": "85c1069f46436e078a96ed6af80efcd606e2c75aeeeb9be44dc09e7161569d79",
  "568": "b3669305459462b02d267fb4b7e250affc05eb8fcd9e7b3238dab3cd34b8edca",
  "569": "7e5c9671ca23c212fbdd675f9e4fee583fdcb28018aa05e41dfa8fad72782bdb",
  "570": "93efc2e75f2908b4441cbdd3af596e52febb2ef40ab8e759f020a35c54926b9d",
  "571": "7475bbea8819d86bcacfb16b3128b49f8f406f744a0d594182626d3dc8b2a3b8",
  "572": "d6da06b71d0c21b56e93372e3c201d50cc943e129e7fd8217b0b2ff8ee6f5e3f",
  "573": "30b7f0e144a341e14915abd090005a88c396575ed6a994f81b91a3286d018d71",
  "574": "fa1258f34ec4802a1d377cd66b8c736cd88c8cd0a186f36c782aba5365bd0204",
  "575": "64bc7b9b88f1e0f5058d63e8f3697def2a47cfb73e78804cddd81de356f9dd8a",
  "576": "2c37c583e18789ffd8841cb482177fe114ab185cd9e1a2147516209912b4d489",
  "577": "e42486fe691bb476ecc06f1824f5f5b396c3fa1ba9207f61b672c4b5887d8df2",
  "578": "e7cddf3e3c748e88029d5fc10b9a6c1b6667e3f09cf9dfdf4f20a09d873ba193",
  "579": "c8eea0b296073444a1c60c06d2bfe3f220cc72eba8dd27d1df7871dff5a68155",
  "580": "093adc81b9b70476049355987c86d11ec02de017a391e94a66c09f7f56cbb88f",
  "581": "90e3e161cabb69fb555f429aa159a04c88658d0f9f157f6607797d8a06244ee6",
  "582": "97a22dd2cad91fb278ec1904f8a62ed6a5f4b4b5620280199887686d555777e9",
  "583": "86631227dfb55e5342be5849fddc55d83af65ba1ee207e90492c748afa22e321",
  "584": "f0180ba2cfa66b3f194ef5e2f7608c1ee582f048ed77ce680ef707332972c99b",
  "585": "928a13377975242d352d6d510523d040c8107352a0012621ad331864a49e24dd",
  "586": "d8d23d639c1ef4503d0bf661a70598f4dfb233d4a2d3e9e9de767dcf6de1db56",
  "587": "6b63cba4e94b93bfcc3de4e94dc599106d36132eb57d93e2280dcfa40781757d",
  "588": "dc9fd502544843633e35a375b5f3b43f73d75aae1f397cdb5f3828e773fd7d3c",
  "589": "4401540968241f1ff96a56bb13a9365a412503a0fba9c45df749e1f9fc5ee440",
  "590": "6f68cc929b5257beaae8aa07aca3e170be033728241abcb2b27de1c82172a4ab",
  "591": "a096731248b12ff893da3c8e9fa576d3185444e6e581dbb64de90fcd48952988",
  "592": "0b9ad889db4e0e4ed5c49b5c5b4b16e81256972c973e599d86d48fb50f27d1bd",
  "593": "14d10a36f946684632ac3ad7f39fa9256a8245c839426ba3c0371fb9c5a2e053",
  "594": "d42b6abe32890cccaeba6c442a3bc735faf89e293fd138134c892d58c20ea715",
  "595": "64f5fd0d0788cdfbd14b8bbe361e0b315e5b5e2b78c463078344139d8ed49a6a",
  "596": "e0dd901dc6544aebf087cf4d2a7c38569c09f167af8f75eaa8cf0071cd350370",
  "597": "623544641ff58ea67eee25d224882a43ac989752145dd8a071175cfbf7dcd958",
  "598": "d94ce4fa02aa00ebc5bb515a945ffaccbe39f2fbe90e594c95a5cf4b5a9192ed",
  "599": "fdefa48ce8236186b696bbecf82cc511855754f07b8a66128940ec139c63a754",
  "600": "4f1c4ad1c16ad51ce09a0a0b9d3b2ff9c8450d672075bfdf8c10245f3decef36",
  "601": "1ac6e99c0a6930c26c6ee0b3bd0ba7960e51f1801a1acd456db6350cb37395c5",
  "602": "678d83cf19d34a6145ebe91fd0f4c8a3274c9951f071e6e1ad7a0d23bf2b8b5f",
  "603": "2fc65ecf9cad1ff4ba2c71214d3c723f6ba39fa8e294f23c9bb86e01a62e886c",
  "604": "cbfee6003a01493c1d4058f6778b7a35c159889cb4eff76ae1dac157214f8f58",
  "605": "ad0ebdfcf187517d82a88978687ed6336f72fe16724b593f1bad77d200e0c4cf",
  "606": "e89c27044e9137515cc9c1040b1edbdbff8691a6bfe31ee14f9e823fc78da202",
  "607": "ec909da26091bd29a40064b66b226e3fd72c0a6b6fc4e152be09bcc8991d8fdc",
  "608": "81d28fcd4dbf8044f6b1724dc634a8e61b64e7b7ec5d3ce9488cab33f23d200a",
  "609": "580ccbeb9bb0aea3c1ef3882bbd51f00dbc80f4aed1e41c07d423230b851d773",
  "610": "3309af3e0c4d1ffcfa910f3c47cb60d4d57ef120915f93fd4c3b187fb8c94f03",
  "611": "d61015817f7c16addd9c3bd58e830efb8fd2b7102426f5d85327a117b8955e53",
  "612": "6e0d37ae49bc91f18f9850a0e351705d6bfb7409bc1bf561cd166edd63a0104a",
  "613": "4c638faf6afd0a59571c8faa3373ddaa708eb59a884a33486e1c3f50d9289804",
  "614": "ae08bb8046b7ff027dc77d57c2ac930352367122b2ea5b2b1d48323ece06a473",
  "615": "3646cbc7b637785c1cc7175100f698ae57b4df4265f1bcad9b5944aced74f002",
  "616": "7c93f1d8dd0dcf3a7ef06aaaf0314070ca57967e578138e4825582667e006494",
  "617": "e1c31af6f532dce460a817c7c3fce067d26ebdc910149c4f7529776bf4aab747",
  "618": "291f7ded59173cb38e5dd578eaa881007b042407b1255030032d1eff7cae37dd",
  "619": "fb1124a3066d4a56ad516cc1c496b519091afc4c6131dc01fd1d6bed6659a6fd",
  "620": "d1bb3a811e72c850ede8d878d52a734313afee9975421e27ab4dc54c89f7f496",
  "621": "589ef7e01d7f95b0779f8aebaba46ba5f112f373aed45e6413e72051359752b6",
  "622": "5cfd70f199579b92b853211f1fd1a1f86fd5b1538fab1104f8b8a390c126b774",
  "623": "e781ec7fe5fe07713d5ad1463ca9609713b40a10c411051a34b57656fd6ae196",
  "624": "974c196a92a6f461478c4e6fef609d6495e63e07d7e9bc62110e633de71332f1",
  "625": "5fb80288c1433d4720260a2abaf14b1de9d2b2f68e4d260a4a6ae5804c0d6b15",
  "626": "0255ca33d80da60f6c9745db917adc1216c5c839c552a69585b58f9fb77a51ef",
  "627": "a28a0dd1f64e92f3d0b000c8edbe9389d42128252165eeb76b2cd82188494b5e",
  "628": "b458f391f282b6db496ff437c294fbcc12f63958004e749fc4196f6a9f872a51",
  "629": "087c0b7db40f0188e574dc285106fc938268768be0731e2a93c1796a00792372",
  "630": "b10e0e8be08a4e1b0f10223c70cd29c76bfcb27f0717ef0d0218fac397056b80",
  "631": "fe228863843306ae0b9d6c096f70c0e084b39110a3b4506a4c7c188deb7cdef5",
  "632": "d8d9e18e913fe27189a31eaddee9fb7cd6005fbe6770344316c26a42148fb5fc",
  "633": "3af19b2c28f2680532803e98e516501086d7934385b74f541a5e1c8de7a38476",
  "634": "9267002ba7dae3f5d800d95ad905b0e54f8adca224395a3a58a5f58dfd31035b",
  "635": "bcd81d8afea407426741885111776b37444957fad172fc69c7ae16cb6d8d967e",
  "636": "b9b1377b44ff6d7badcca0c614caf1f3dce516e27762bb6a65fd247f423b5e70",
  "637": "e4e9771d9b6a3f8866fccd0b03670b9dbf944530e1847343cd575b6aa05f4747",
  "638": "e5760881630845d658f0707dd3517f42650e0fb834e5aaf57f77b0f9a7057a39",
  "639": "f8d37d46c5ed183a15fd96df6724517d59f862a164f21580619aab6969637beb",
  "640": "baf13cd5d58031ccbc3389fbd5fa380d94e64cbdbebf3b5c6cbc6344b1b732dc",
  "641": "c8f3c679d55cb4a6071a1329efb89b0d34049e356cddd1a85f4c465cec950b80",
  "642": "ed8c6697d553bbd4b063d7e900529831a5c46d97f4170cb8902fff2089e3e943",
  "643": "df1b57e2e9fe6a0864b4a1aa4c635ad391244bda5bd62e223cce970a44d8b9d1",
  "644": "10552127d340a0a4e9b10c8fc695a6c4326d2a2a26218f4da79e6e2ad49d9267",
  "645": "66e580543df2ec16a7855df567b540a88422643d82931e8ce8bcacb568346cf7",
  "646": "469f1f41e1db29580f18b5f6734af26c91ce5ab7332a33f6442a89e1c9ae8cac",
  "647": "539dbdaf51a29bb3330ba16fa45197364551d0a7b0dd509ecb3526bcedb01aef",
  "648": "a30a1ae1a72376846c4b955e660743a7a62c806c318cba29d3401917ad47de9b",
  "649": "26ee90106b9ecb91be4ab396f54eedd00290f3f89d4063f0df985d3387ae477c",
  "650": "53dc92684c94ddf237756bb5534719f7bbc097379e69b8da5a740245401f24fa",
  "651": "d292be215ef9655ce75f72d3ec882ddedb34ac5f3cff3226a6f180c5be311efa",
  "652": "02c43f8866b8f53e63afa8e4bebf7dc449b9d0cdd0217d3ff30c1461fcddf566",
  "653": "96ee15e6be329d08f62a56c5e29763c69fdbed8a9c9ef611ddc7f9cb948c350e",
  "654": "84cd2fea065a8c0ec033743879e7f1149c526c5a5d6e498a41f44c212dcdc949",
  "655": "cc95d67775c08819f83d3a2024b2f57a77d6cbe7729b258fd7b226fe62ba11c5",
  "656": "651195bad4fec32b4bddbaf612132905bebd06466c315dd37f7cff27e1189166",
  "657": "e1f5a6ae64ad6bcf4e8b70d9a643c16305c5dd2585c6d3bfebf85e9b22ab7125",
  "658": "cbacfe7a0ddd73676ad72e92497d821c9fdf59961b701398fbe4a747fb455b6b",
  "659": "3dd4e89cc15e9c332a6dd1371675fad88c9c55a574b82f4f3e568408a0b05d33",
  "660": "24cda50a94d5af81e6bd5919b5ee09ed2f3d1826ec872ff3903b46486e5d1e0e",
  "661": "6a9e865c13943e1239f3f7be5a5fb6b6cf05f815f0a3738277ecffc5baae3cf7",
  "662": "20864ff0143b4d8750b1e63905f611f5dd8541015a1abc3927392b99fe207381",
  "663": "13036d003a9a0ac04b381d1fce2bf27d459e02b25c24f95a2eba09e6c4f909e0",
  "664": "fb34654c126dc121e9d94771fdedad1aec5cd65a4654d210fa87af741df0321b",
  "665": "48976aa496c95e165256fa87182a17eb734c1742b3772eb021f13b0c535bcac3",
  "666": "e7da66ac2bf7d919cc139f272d6e71538d3003c13304ef5188c5b40d96850703",
  "667": "9dfcbabab680dc893a33ae9de40953336bad9c30ea4749c04af15b8f91c19c23",
  "668": "89cab275083cad58e1361b50113c3e4a79ad6ac920ecf5f9014f5aae16565f52",
  "669": "4872b27fc63568a27b1ef0fda68f4db0d1d7e9c65c183049c190d0c9ea856d6d",
  "670": "fef0bb61fbf4937ef36f6a1e2f56f216f7ec3ae8e970942a8eceb7b3a3f19f3d",
  "671": "941f453260869c407d5aecf35ece78f0cf1e3014fd09671a5b0f1e1e782d5ba9",
  "672": "8a549f2e4fcde464f0e964f3970a062a02c9259479398119f76f1aa84e747dcd",
  "673": "5c9ae7ece02809f31a18eb1ce8bc321060ba39161d188b12878ed52431bf70fe",
  "674": "7d4baeb6fed89f9c65ab0db00bed397c45ea08a5babb3789d5e1729392e586c5",
  "675": "ba5f43cabfb884d4477a72520b80688fd49dba6623b1eb848ed19a51d572854c",
  "676": "e1a46208a9003e2736a425aef45d750417e25e97365345288d4b0bbc13681ab1",
  "677": "0857d9652f58dfb13fca45b9706559b43fa1411bae0e3c366549b2b72569ff6d",
  "678": "3c6de2be3c8854ae48b58f1371785741da29be19fbef534d9417ed3cb5881be5",
  "679": "5afd71600472d2bc830439ec5110f3d41ed89ef8d318766f0a9a601df1eeee91",
  "680": "a067a443d542111a7398a48724e3a2be1ab13311e2d1a327f9cdb96f78aa659e",
  "681": "c1ca13fedd027111234c0245a612e6bdb81f337b56e61e22384ab0e6360ae6c5",
  "682": "a2af86ed0a96e310347983d6c1e74cfdf4a7d6a332d101efa536d449210ea861",
  "683": "2ca22b9b02d0a6c8e0d2cca3f2c7af2a63dfc296fde9b5478723b6578391bce5",
  "684": "c4315b893d3eb55d3263d6ae5b7563aede99f7ebbdaec93e81c0c69653cba18e",
  "685": "3d6810e601bc167bf81ed4902769ae54a4eeaf76e54770b29e6b088dd1381275",
  "686": "de957f336142d6f1a1ae4b5e93ffa7e970d23566152594b071ae9564a46718df",
  "687": "820d23dd6923776959b519d2b8ccb004e6d4114a93ef009e656a517636f971cb",
  "688": "773f02e558a3f52e55dd13c9723a3f3f18a1359b724e62b4780e9dd4b86aa5d7",
  "689": "20db07f28ab734abc64072c779301db3daf0352b3a7aa21239aa02f11487d9f3",
  "690": "2c0a041aad07087a624d74d9eaad50729ad2af7996a2aacece8bdb9c6126cf06",
  "691": "4ab834dd42fbf32d90cde32acb503753f91eeb578abe606253ef99fdab07c1f1",
  "692": "962eb8191ae4b15f072126f90590556460fb0f8524a1641f7b002bbd73d0c34d",
  "693": "bd9cc45ff9979f2b239c63b2ae2351514c881b0ab9a130d96d8e316b93a93ac9",
  "694": "9f0a8b8dcbf69a7e9792e2566cfed0ddaef7c43504dce18e349fe708fbd8a8de",
  "695": "e213c440ed1c215003b67a2889950441baf3ecf4bac724bab0ca73144439e75c",
  "696": "c290fe5aee36626a26713695de55f61141c95516c3afd58f63c61dfe6b5d0582",
  "697": "0e31dee5103e65a9643073322974414d0e3fc72aae03baf3768c2fd4492e8f98",
  "698": "4d69b01b39202f3920a156a002a2548c533a8ccaa0078091947c9cbed622a11c",
  "699": "2aa9f63ec800e2ea291adf28c39de97c5af2c86916a650820c1e2ceaee35c0c6",
  "700": "65168c8304b50a0e466eff3314ece9bcf8ac2a6ccf4ca4ce07add781706a696f",
  "701": "d426d5496e76fbab2dad2d4d6d89ef62684422547538a4d2143fee365382db64",
  "702": "13deb6a131885e7d26d5825602779bf716cda3f3a6fbb72fb351ff7ab5220109",
  "703": "4a1d93a14ebbf12db724b36017f309ec909a2c249bed5cdafdcd4163435e6748",
  "704": "d0003cc16234ccbe1eba0a5c1e29b1f606e1d7a8ec572f00d6bf8a2d5217b02b",
  "705": "1d8eadbe2af375ba2c6e1bf87a7dfdd44a08a50f9112d3d070438e875c3f24bf",
  "706": "7b2f996bf023672691a5d472c09905337d1519144c65c3170a1b96ecc0ced14e",
  "707": "e0361403eb984115f39cd2634618455dcf3d0824157feb884c2d6f63208184b4",
  "708": "cc475deeb989c025f6c558cd887d967f653212c341bc09d1d565321f65cdc7af",
  "709": "4c2a88722bee4b4208e7443dd5e61c68b1ac65cbf71ea9e4bf9cf7500385b46b",
  "710": "6c56e29be1891700c32cd4751ef3d68889c337fefc710705b36c7032f74de2e8",
  "711": "25270bd87432e945db504f0f2f09644b77191bdee88cc1c1d970c0985f10d52c",
  "712": "6e00dfdc8d2cf030cd5ce7eaedfb44693ec5b964fda47819a25d9e86ffbfd273",
  "713": "0cd196bcf6d6e784fa9b87943136893321b426ee8b31886a941f449fa9c10dbe",
  "714": "285356997f54973376aadfc2cee8625afda3bde79517623eb8585125a3cff99c",
  "715": "e069c1367206d27852e72ca7b0523bb40049b5dd0cedaaa2efda20b9fae0088b",
  "716": "a0dfb1a42cb6a873adbbe1cd44fc788820e13e54c63c809c09fdd488b4e386a3",
  "717": "1bee5e5510b183e7ebb88c6c245337d32cc3fdae1023e6776a871dc88350358d",
  "718": "301b75181c94d4caed4c789f950b1d8f37ac39e461efee59b35f953ee7069801",
  "719": "e1a111b07046c1706fed2bfedfca6b0b930c3f2cf9a6a86d3e50654f9b3a62b4",
  "720": "7898042de9d62171a097d3b6411c98c979b1a5d052f547a4af12aaad822921af",
  "721": "722490629d81d0c5066e161b242349babac25b6b146470b4e1de4b0cffc0daf7",
  "722": "3929e07bbebf26cdc28ebc876be2376240ed8749f34ed56a00d456b715d2cb83",
  "723": "8580b0726e1a50ef4479d2cfe50de5b7290e118306a4e0ecc68f2357325c5e61",
  "724": "bc75c9fb28566ee9ecd00ad0d712af191fe50e3f893c163ad653cb481ae741dc",
  "725": "1fff1bdf0cba13e546edf687a0a61c1df1a6c4d1a6872e8a7c34aaa485127ec9",
  "726": "2aaa8333447e2e8faf846c047eb9cebdccbc078cd3f8599d27da0b4d34bb2f10",
  "727": "d6eec30933aface44a3159bd7f032a91804f401d672ddd19662de9a14f39105b",
  "728": "a29ee7100cea41384c897d6760666a013b71fba1b7a0a69b56956538b70a9de3",
  "729": "2653771513dbb5cf981bce5c5b840551f7aab790d6edeea5a462403042c25136",
  "730": "9ad906897f17eb44bdcb0bca01fded634c1cfb79b43ce483e585ef05fbc63bb2",
  "731": "ec975f482ef7f28a56e546275c0545c80b2031381b792d6ae7391e0a2598ab42",
  "732": "17c5f38ba839f43e94d91c54e04fda3dea8701e2fbd72d9303a2ad2875292f7f",
  "733": "3dfd345aca389e8fc373bf96c5eff6041445f530d871dec65b6fa42d716cb3db",
  "734": "03c74eaf9edf7e87ca8d4652750f50348cdf3b91183164c39946f89feaebaf95",
  "735": "14dfbf4dec18f1fe07bf3c6ac0e94231f1b36fb916377422ddf2d245fdf7e32b",
  "736": "959ad7a5d7e941dc859474b39c573d9869ee2d4f4354f4a6b90c20c8d3049379",
  "737": "2b0bee350a505bf19c88ce28b3d6ef42165eebcb82ff3c237b7d3a4998c2a675",
  "738": "1d6b9df93f1c6c6473548b78bc5942366fe483db7b608de3c5db8c00993a3c6a"
};

// Complete ERC20 ABI for token approvals
export const ERC20_ABI = [
  {
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [{ "type": "core::felt252" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [{ "type": "core::felt252" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [{ "type": "core::integer::u8" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "total_supply",
    "inputs": [],
    "outputs": [{ "type": "core::integer::u256" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "balance_of",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "account" }
    ],
    "outputs": [{ "type": "core::integer::u256" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "owner" },
      { "type": "core::starknet::contract_address::ContractAddress", "name": "spender" }
    ],
    "outputs": [{ "type": "core::integer::u256" }],
    "state_mutability": "view"
  },
  {
    "type": "function",
    "name": "transfer",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "recipient" },
      { "type": "core::integer::u256", "name": "amount" }
    ],
    "outputs": [{ "type": "core::bool" }],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "transfer_from",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "sender" },
      { "type": "core::starknet::contract_address::ContractAddress", "name": "recipient" },
      { "type": "core::integer::u256", "name": "amount" }
    ],
    "outputs": [{ "type": "core::bool" }],
    "state_mutability": "external"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "spender" },
      { "type": "core::integer::u256", "name": "amount" }
    ],
    "outputs": [{ "type": "core::bool" }],
    "state_mutability": "external"
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "from", "indexed": true },
      { "type": "core::starknet::contract_address::ContractAddress", "name": "to", "indexed": true },
      { "type": "core::integer::u256", "name": "value", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "Approval",
    "inputs": [
      { "type": "core::starknet::contract_address::ContractAddress", "name": "owner", "indexed": true },
      { "type": "core::starknet::contract_address::ContractAddress", "name": "spender", "indexed": true },
      { "type": "core::integer::u256", "name": "value", "indexed": false }
    ]
  }
];
