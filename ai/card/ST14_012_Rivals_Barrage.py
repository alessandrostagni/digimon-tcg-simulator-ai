import math

from Card import Card

## TODO: Keep coding from here
class ST14_012_Rivals_Barrage(Card):

    def __init__(self, bot, game, **kwargs):
        self.bot = bot
        self.game = game

    def delete_opponent_digimon_highest_level(self, ws):
        if len(self.game['player1Digi']) == 0:
            return False
        opponent_digimons = []
        for i in range(len(self.game['player1Digi'])):
            digimon = self.game['player1Digi'][i][-1]
            opponent_digimons.append(digimon['level'], i, digimon['name'])
        self.bot.delete_from_opponent_battle_area(ws, sorted(opponent_digimons, reverse=True)[0])

    ## TODO: Can make this optional
    async def when_trashed_effect(self, ws):
        trash_index = self.kwargs['trash_index']
        self.bot.move_card_to_battle_area_from_trash(ws, trash_index)

    async def delay_effect(self, ws):
        self.bot.st14_012_rivals_barrage_delay_strategy(ws)

    ## TODO: Code strategy when two or more digimons have the same level
    async def on_play_effect(self, ws):
        self.delete_opponent_digimon_highest_level(ws)