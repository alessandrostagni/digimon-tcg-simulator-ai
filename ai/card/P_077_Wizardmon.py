from card.Card import Card


class P_077_Wizardmon(Card):

    def __init__(self, bot):
        self.bot = bot

    async def when_trashed_effect(self, ws):
        await self.bot.increase_memory_by(ws, 1)
    
    async def when_digivolving_effect(self, ws):
        await self.bot.increase_memory_by(ws, 1)

