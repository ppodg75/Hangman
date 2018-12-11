package endpoint;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import dto.PlayerDto;
import server.Server;
import service.PlayerService;

@Path("/players")
public class PlayersEndpoint {
	
	private final PlayerService playerService;
	
	public PlayersEndpoint(Server server) {
		playerService=new PlayerService(server);
	}
	
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	public List<PlayerDto> getList() {
		return playerService.getPlayersDto();
	}

}
