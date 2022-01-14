use anchor_lang::prelude::*;
use anchor_spl::{
    self,
    associated_token::AssociatedToken,
    token::{self, Mint, Token, TokenAccount},
};
use rand::{thread_rng, Rng};

declare_id!("HHJgVhndgFHUF6BrtnFuSJir4BVLt4TSb6mEzPivsxDJ");

#[program]
pub mod first {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

    pub fn update(ctx: Context<Update>, data: String) -> ProgramResult {
        let base_account = &mut ctx.accounts.base_account;
        let copy = data.clone();
        base_account.data = data;
        base_account.data_list.push(copy);
        Ok(())
    }

    /* pub fn pickRandomRarity(range: u8) -> Rarity {
        let mut rng = thread_rng();
        let value = rng.gen() % 10000;
        for elem in iter {
        }
    } */
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 64+64)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}

#[account]
pub struct BaseAccount {
    pub data: String,
    pub data_list: Vec<String>,
}

pub enum Rarity {
    Common,
    Uncommon,
    Rare,
    Master,
    Legendary,
}

pub enum Position {
    Goalkeeper,
    Defenser,
    Middle,
    Forward,
}

pub enum Feet {
    Left,
    Right,
}

pub struct Player {
    pub name: String,
    pub rariry: Rarity,
    pub inteligence: u8,
    pub speed: u8,
    pub stamina: u8,
    pub strength: u8,
    pub feed: Feet,
    pub age: u8,
    pub mint_wallet: String,
}
