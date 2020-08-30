class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is a now friend`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx === -1) {
      throw new Error('no encontradp1');
    }
    this.friends.splice(idx, 1);
  }
}

describe('Friendslist', () => {
  let friendsList;
  beforeEach(() => {
    friendsList = new FriendsList();
  });
  it('inicializar la lsita de amigos', () => {
    expect(friendsList.friends.length).toEqual(0);
  });
  it('add a friend to the list', () => {
    friendsList.addFriend('Abraham');
    expect(friendsList.friends.length).toEqual(1);
  });
  it('announce new friend', () => {
    friendsList.announceFriendship = jest.fn();
    expect(friendsList.announceFriendship).not.toHaveBeenCalled();
    friendsList.addFriend('Abraham');
    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Abraham');
  });

  describe('removeFriend', () => {
    it('Remueve a un nuevo amigo', () => {
      friendsList.addFriend('nuevo');
      expect(friendsList.friends[0]).toEqual('nuevo');
      friendsList.removeFriend('nuevo');
      expect(friendsList.friends[0]).toBeUndefined();
    });
    it('throws  then doesnt exist', () => {
      expect(() => friendsList.removeFriend('nuevo')).toThrow();
    });
  });
});
